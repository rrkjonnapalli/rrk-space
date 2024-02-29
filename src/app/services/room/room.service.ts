import { Injectable } from '@angular/core';
import { APP_ENUMS, IO_ROOM_TYPE } from '@constants';
import { IoService } from '@services/io/io.service';
import _ from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private currentRoom = '';
  private crSubject = new BehaviorSubject<string>(this.currentRoom);
  currentRoom$ = this.crSubject.asObservable();

  private messages: any = [];
  private messagesSubject = new BehaviorSubject<any>(this.messages);
  messages$ = this.messagesSubject.asObservable();

  private _roomType!: keyof typeof APP_ENUMS;

  private rooms: Map<string, any> = new Map();

  socket!: Socket;


  constructor(private io: IoService) {
    this.io.isConnected$.subscribe({
      next: (status) => {
        if (status) {
          this.init();
        }
      }
    });
  }

  init() {
    this.socket = this.io.getSocket();
    this.addListners();
  }

  addListners() {
    this.socket.on('new-room', (data) => {
      const _roomID = _.get(data, 'roomID');
      console.log(`new-room - ${_roomID}`);
      const roomID = _roomID.slice(-36);
      this.rooms.set(roomID, { isAdmin: true });
      this.setCurrentRoom(roomID);
    });

    this.socket.on('joined-room', (data) => {
      const _roomID = _.get(data, 'roomID', '');
      const roomID = _roomID.slice(-36);
      if (!this.rooms.has(roomID)) {
        this.rooms.set(roomID, { isAdmin: false });
      }
      this.setCurrentRoom(roomID);
    });

    this.socket.on('server-message', (data) => {
      console.log(`Got new message`, data);
      this.addNewMessage(data);
    });

    this.socket.on('invalid-room', () => {
      console.log('Invalid room');
      this.setCurrentRoom('invalid');
    })
  }

  setCurrentRoomType(roomType: keyof typeof APP_ENUMS) {
    this._roomType = roomType;
  }

  getRoomID(roomID?: string) {
    return roomID || this.currentRoom;
  }

  isRoomAdmin(roomId?: string) {
    const roomInfo = this.rooms.get(roomId || this.currentRoom);
    return _.get(roomInfo, 'isAdmin', false);
  }

  addNewMessage(data: any) {
    this.messages.push(data);
    this.messagesSubject.next(this.messages);
  }

  setCurrentRoom(id: string) {
    this.currentRoom = id;
    this.crSubject.next(this.currentRoom);
  }

  sendMessage(message: any) {
    console.log('Sending message', message);
    this.io.emit('message', {
      roomID: this.getRoomID(),
      ...message
    });
    this.addNewMessage(message);
  }

  joinRoom({ roomID }: { roomID: string }) {
    const _roomID = this.getRoomID(roomID);
    console.log(`Joining room - ${_roomID}`);
    if (!this.rooms.has(roomID)) {
      this.rooms.set(roomID, { isAdmin: false });
    }
    this.io.emit('join-room', { roomID: _roomID });
  }

  createRoom() {
    console.log(`Creating room - ${this._roomType}`);
    const _roomType = IO_ROOM_TYPE[this._roomType];
    this.io.emit('create-room', { create: true, roomType: _roomType });
  }

}
