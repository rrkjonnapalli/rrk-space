import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IO_ROOM_TYPE, ROUTES } from '@constants';
import { RoomService } from '@services/room/room.service';
import _ from 'lodash';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-room-creator',
  standalone: true,
  imports: [
    NzButtonComponent,
    NzInputModule,
    FormsModule
  ],
  templateUrl: './room-creator.component.html',
  styleUrl: './room-creator.component.scss'
})
export class RoomCreatorComponent implements OnInit {
  @Input() roomType!: keyof typeof IO_ROOM_TYPE;
  roomID = '';

  constructor(
    private router: Router,
    private roomService: RoomService
  ) {
  }

  ngOnInit(): void {
    this.roomService.setCurrentRoomType(this.roomType);
    this.addRoomListener();
  }

  addRoomListener() {
    this.roomService.currentRoom$.subscribe((id) => {
      if (id) {
        this.roomID = id;
        this.gotoRoom();
      }
    });
  }

  isComponentValid() {
    if (!this.roomType) {
      console.log(`Invalid room type ${this.roomType}`);
      return false;
    }
    return true;
  }

  createRoom() {
    console.log('Creating room');
    if (!this.isComponentValid()) {
      return;
    }
    this.roomService.createRoom();
  }

  gotoRoom() {
    this.router.navigate(ROUTES[this.roomType].ROOM(this.roomID));
  }

  joinRoom() {
    if (!this.isComponentValid()) {
      return;
    }
    console.log('Joining room', this.roomID);
    this.gotoRoom()
  }
}
