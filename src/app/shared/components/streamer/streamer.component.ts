import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { IoService } from '@services/io/io.service';
import { StreamService } from '@services/stream/stream.service';
import _ from 'lodash';
import { Instance as ISimplePeer } from 'simple-peer';

declare var SimplePeer: import('simple-peer').SimplePeer;

@Component({
  selector: 'app-streamer',
  standalone: true,
  imports: [],
  templateUrl: './streamer.component.html',
  styleUrl: './streamer.component.scss'
})
export class StreamerComponent implements OnInit, AfterViewInit {

  @Input() initiator: boolean = false;
  peer!: ISimplePeer;
  isConnected = false;

  @ViewChild('stream') stream: any;

  constructor(private io: IoService, private streamService: StreamService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    console.log(`this.initiator`, this.initiator);
    console.log(`my socket id`, this.io.getSocketId());
    this.init({ initiator: this.initiator });
  }

  startCall() {
    const addMedia = (stream: any) => {
      this.peer.addStream(stream) // <- add streams to peer dynamically
    }
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then(addMedia).catch((e) => {
      console.log(`stream error`, e);
    })
  }

  addPeerListeners() {
    this.streamService.newPeer$.subscribe({
      next: (data) => {
        console.log('new-peer data', data);
        if (!data) return;
        const { id, peerID } = data;
        if (this.io.getSocketId() !== id) {
          this.peer.signal(peerID);
        }
      }
    });

    this.streamService.peerlist$.subscribe({
      next: (data) => {
        console.log(`peerlist data`, data);
        for (let { id, peerID } of data) {
          if (this.io.getSocketId() !== id) {
            this.peer.signal(peerID);
          }
        }

      }
    });
  }

  init({ initiator }: { initiator: boolean }) {
    this.peer = new SimplePeer({
      initiator,
      trickle: false
    });
    const peer = this.peer;

    peer.on('connect', () => {
      console.log('CONNECT');
      this.isConnected = true;
      _.set(window, 'peer', peer);
      // window.peer = peer;
      peer.send('new message -' + Math.random())
    })

    peer.on('data', data => {
      console.log('data: ' + data)
    })


    peer.on('signal', data => {
      console.log(`SIGNAL`, data);
      this.streamService.sendPeerID(data);
    });

    peer.on('stream', (stream: any) => {
      // got remote video stream, now let's show it in a video tag
      if (!this.stream) {
        return;
      }
      var video = this.stream.nativeElement;

      if ('srcObject' in video) {
        video.srcObject = stream
      } else {
        video.src = window.URL.createObjectURL(stream) // for older browsers
      }

      video.play()
    });

    if (!this.initiator) {
      this.streamService.getPeerList();
    }
    this.addPeerListeners();
  }

}
