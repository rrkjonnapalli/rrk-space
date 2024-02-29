import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APP_ENUMS, IO, ROUTES } from '@constants';
import { RoomService } from '@services/room/room.service';
import { StreamService } from '@services/stream/stream.service';
import { RoomCreatorComponent } from '@shared/components/room-creator/room-creator.component';
import _ from 'lodash';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { StreamerComponent } from '@shared/components/streamer/streamer.component';
import { IoService } from '@services/io/io.service';
import { ToolbarComponent } from '@shared/components/toolbar/toolbar.component';

declare var SimplePeer: import('simple-peer').SimplePeer;

@Component({
  selector: 'app-real-stream-main',
  standalone: true,
  imports: [
    RoomCreatorComponent,
    StreamerComponent,
    NzSkeletonModule,
    ToolbarComponent
  ],
  templateUrl: './real-stream-main.component.html',
  styleUrl: './real-stream-main.component.scss'
})
export class RealStreamMainComponent implements OnInit {
  roomType = APP_ENUMS.REAL_STREAM;
  roomID = '';
  isLanding = true;
  isJoined = false;
  isRoomAdmin = false;
  isRoomLoaded = false;



  constructor(
    private roomService: RoomService,
    private io: IoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.roomService.setCurrentRoomType(this.roomType);
    this.io.init(IO.REAL_STREAM_SERVER);
    const routeParams = this.route.snapshot.params;
    this.roomID = _.get(routeParams, 'id');
    if (!this.isJoined && this.roomID) {
      this.isLanding = false;
      this.roomService.joinRoom({ roomID: this.roomID });
      this.isJoined = true;
    }
    this.init();

  }

  init() {

    this.roomService.currentRoom$.subscribe({
      next: (roomID) => {
        if (this.isLanding || !roomID) {
          return;
        }
        if (roomID === 'invalid') {
          this.roomService.setCurrentRoom('');
          return this.router.navigate(ROUTES.TEXT_SHARE.HOME());
        }
        console.log(`valid room stream`, roomID);
        this.roomID = roomID;
        this.isRoomAdmin = this.roomService.isRoomAdmin();
        this.isRoomLoaded = true;
        return;
      }
    });
  }

  onToolbarAction(event: any) {
    if (event.type === 'COPY_ROOM_ID') {
      this.copyRoomID();
    }
  }

  copyRoomID() {
    navigator.clipboard.writeText(this.roomID).catch((e) => {
      console.log(`error while copy`,e);
    })
  }

}
