import { Component, OnInit } from '@angular/core';
import * as SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  private client: Client;
  public stompClient: any;
  webSocketEndPoint: string = 'ws://localhost:1996/websocket';
  message ='';
  
  ngOnInit() {
  }
  constructor() { 
    // this.initializeWebSocketConnection();
    this.connect();
  }


  private initializeWebSocketConnection() {
    // const socket = new SockJS('ws://localhost:1996/websocket');
    // this.stompClient = new Client({
      // webSocketFactory: () => socket,
      // onConnect: (frame) => {
      //   console.log('Connected: ' + frame);
      //   this.subscribe();
      // },
      // onStompError: (frame) => {
      //   console.error('Broker reported error: ' + frame.headers['message']);
      //   console.error('Additional details: ' + frame.body);
      // }
    // });
  }

 

  connect() {
  //   const socket = new SockJS(this.webSocketEndPoint);
  //   this.stompClient = StompJs.over(socket);
  //   this.stompClient.connect({}, frame => {
  //     console.log('Connected: ' + frame);
  //     this.subscribe();
  //   });
    this.stompClient = new Client({
      brokerURL: this.webSocketEndPoint
  });
  this.stompClient.activate();
  console.log("inside connect");
  
  this.stompClient.onConnect = (frame) => {
    console.log('Connected: ' + frame);
    // this.sendMessage()
    this.subscribe();
};
  }

  subscribe() {
    console.log("this.stompClient---",this.stompClient);
    
    this.stompClient.subscribe('/receive/msg', messageOutput => {
      console.log('Received: ' + messageOutput.body);
    });
  }

  sendMessage() {
    this.stompClient.publish({destination: "/app/send", body: JSON.stringify({"message":this.message})});
  }

  disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log("Disconnected");
  }


}
