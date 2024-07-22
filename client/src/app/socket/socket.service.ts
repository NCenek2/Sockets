import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { ChatService } from '../chat/chat.service';
import { UsersService } from '../users/users.service';
import { MessageDto } from '../models/Message.dto';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private destroyRef = inject(DestroyRef);
  private chatService = inject(ChatService);
  private usersService = inject(UsersService);

  username = this.usersService.username;

  private _socket = signal<Socket | undefined>(undefined);
  socket = this._socket.asReadonly();
  private _socketId = signal<string>('');
  socketId = this._socketId.asReadonly();

  currentRoom = this.chatService.currentRoom;

  setSocketId(socketId: string) {
    if (this._socketId() === '') {
      this._socketId.set(socketId);
    }
  }

  setSocket() {
    if (!this._socket()) {
      this._socket.set(io('http://localhost:5000'));
    }
  }

  subscribe() {
    const messageHandler = (messageData: MessageDto) => {
      this.chatService.addMessage(messageData);
    };

    const joinRoomHandler = (room: string) => {
      this.chatService.joinRoom(room);
    };

    const removeRoomHandler = (room: string) => {
      this.chatService.leaveRoom(room);
    };

    const receiveSocketIdHandler = (socketId: string) => {
      this.setSocketId(socketId);
    };

    this._socket()?.on('id', receiveSocketIdHandler);
    this._socket()?.on('message', messageHandler);
    this._socket()?.on('join', joinRoomHandler);
    this._socket()?.on('leave', removeRoomHandler);

    this.destroyRef.onDestroy(() => {
      this._socket()?.off('id', receiveSocketIdHandler);
      this._socket()?.off('message', messageHandler);
      this._socket()?.off('join', joinRoomHandler);
      this._socket()?.off('leave', removeRoomHandler);
    });
  }

  messageEmitter(message: string) {
    if (this.currentRoom() !== '') {
      this._socket()?.emit('message', {
        message,
        room: this.currentRoom(),
        username: this.username(),
      });
      return '';
    }
    return message;
  }

  leaveRoomEmitter() {
    const leftRoom = this.chatService.currentRoom().trim();
    if (leftRoom !== '') {
      this._socket()?.emit('leave', leftRoom);
      this.chatService.setCurrentRoom('');
    }
  }

  joinRoomEmitter(room: string): string {
    const joinedRoom = room.trim();
    if (joinedRoom !== '') {
      this._socket()?.emit('join', joinedRoom);
      this.chatService.setCurrentRoom(room);
      return '';
    }
    return room;
  }
}
