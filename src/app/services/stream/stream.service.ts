import { Injectable } from '@angular/core';
import { IoService } from '@services/io/io.service';
import { RoomService } from '@services/room/room.service';
import _ from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class StreamService {

  private _currentRoom: any = null;

  private peerlist: any = [];
  private _peerlist$ = new BehaviorSubject<any>(this.peerlist);
  peerlist$ = this._peerlist$.asObservable();

  private newPeer: any = null;
  private _newPeer$ = new BehaviorSubject<any>(this.newPeer);
  newPeer$ = this._newPeer$.asObservable();

  socket!: Socket;

  peerMap: any = new Map();

  constructor(private io: IoService, private roomService: RoomService) {
    this.io.isConnected$.subscribe({
      next: (status) => {
        if (status) {
          this.init();
        }
      }
    });

    this.roomService.currentRoom$.subscribe({
      next: (v) => {
        this._currentRoom = v;
      }
    });
  }

  init() {
    this.socket = this.io.getSocket();
    this.addPeerListListener();
    this.addNewPeerListener();
  }

  addPeerListListener() {
    this.socket.on('peer-list', (data) => {
      console.log('got peer-list', data);
      this.peerlist = data;
      this._peerlist$.next(this.peerlist);
    });
  }

  addNewPeerListener() {
    this.socket.on('new-peer-signal', (data) => {
      console.log('got new-peer-id', data);
      const {id, peerID} = data;
      const currentId = this.peerMap.get(id);
      if (_.isEqual(currentId, peerID)) {
        return;
      }
      this.peerMap.set(id, peerID);
      this._newPeer$.next(data);
    });
  }

  sendPeerID(peerID: any) {
    const data = { roomID: this._currentRoom, peerID };
    console.log(`sending 'peer-id'`, data);
    this.io.emit('peer-id', data);
  }

  getPeerList() {
    const data = { roomID: this._currentRoom };
    console.log(`Sending get-peer-list`, data);
    this.io.emit('get-peer-list', data);
  }

}
