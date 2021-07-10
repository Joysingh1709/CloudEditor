import { Inject, Injectable } from '@angular/core';
// import * as io from 'socket.io-client';

import { io } from 'socket.io-client';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebhooksService {

  // readonly uri: string = "https://editor-app-api.herokuapp.com";
  // readonly uri: string = "http://127.0.0.1:5000";
  socket: any;

  constructor(@Inject('BaseUrl') private uri,) {
    this.socket = io(this.uri);
  }

  joinRoom(roomId: string, userId: string) {
    this.socket.nsp = '/docEvent';
    this.socket.emit('join', roomId, userId);
  }

  listen(eventName: string, docId: string) {
    console.log("listenning : ...", docId);
    return new Observable((subs) => {
      this.socket.nsp = '/docEvent';
      this.socket.on(eventName, (data) => {
        console.log(data);
        subs.next(data);
      })
    })
  }

  emit(eventName: string, data: any) {
    console.log("emitting data");
    this.socket.emit(eventName, data.room, data);
  }
}
