import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APP_ENUMS, IO, ROUTES } from '@constants';
import { IoService } from '@services/io/io.service';
import { RoomService } from '@services/room/room.service';
import { RoomCreatorComponent } from '@shared/components/room-creator/room-creator.component';
import { ToolbarComponent } from '@shared/components/toolbar/toolbar.component';
import _ from 'lodash';

@Component({
  selector: 'app-auction',
  standalone: true,
  imports: [
    RoomCreatorComponent,
    ToolbarComponent
  ],
  templateUrl: './auction.component.html',
  styleUrl: './auction.component.scss'
})
export class AuctionComponent implements OnInit {
  roomType = APP_ENUMS.AUCTION;
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
    this.io.init(IO.AUCTION_SERVER);
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
          return this.router.navigate(ROUTES.AUCTION.HOME());
        }
        // if (this.roomID === roomID) {
        //   return;
        // }
        console.log(`valid room stream`, roomID);
        this.roomID = roomID;
        this.isRoomAdmin = this.roomService.isRoomAdmin();
        this.isRoomLoaded = true;
        console.log(`final`, this.roomID, this.isRoomAdmin, this.isRoomLoaded);
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
