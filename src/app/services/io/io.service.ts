import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { IO, IO_SERVER } from '@constants';
import { getUUID } from '@utils';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class IoService {
  private socket!: Socket;

  private isConnected = false;
  private _isConnected$: BehaviorSubject<boolean> = new BehaviorSubject(this.isConnected);
  isConnected$ = this._isConnected$.asObservable();

  private myID = null;


  constructor() {
  }

  getSocket() {
    return this.socket;
  }

  init(server?: string) {
    console.log(`Connect to - ${server || IO_SERVER}`)
    this.socket = io(server || IO_SERVER);
    this.socket.connect();
    this.isConnected = true;
    this._isConnected$.next(this.isConnected);
    this.socket.on('myid', (id) => {
      this.myID = id;
    });
  }

  getSocketId() {
    return this.myID;
  }

  emit(event: string, data: any) {
    this.socket.emit(event, data);
  }
}
