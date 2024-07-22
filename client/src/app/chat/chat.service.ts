import { Injectable, signal } from '@angular/core';
import { RoomsMap } from './chat-rooms/chat-rooms.model';
import { MessageDto } from '../models/Message.dto';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private _roomsMap = signal<RoomsMap>(new Map());
  rooms = this._roomsMap.asReadonly();

  private _currentRoom = signal<string>('');
  currentRoom = this._currentRoom.asReadonly();

  setCurrentRoom(room: string) {
    this._currentRoom.set(room);
  }

  addMessage(messageData: MessageDto) {
    const { room } = messageData;
    this._roomsMap.update((prevRooms) => {
      // Check to ensure room exists for user before setting
      if (prevRooms.has(room)) {
        const updatedRooms = new Map(prevRooms);
        updatedRooms.set(room, [...updatedRooms.get(room)!, messageData]);
        return updatedRooms;
      }
      return prevRooms;
    });
  }

  joinRoom(room: string) {
    if (!this._roomsMap().has(room)) {
      this._roomsMap.update((prevRooms) => {
        const newRooms = new Map(prevRooms);
        newRooms.set(room, []);
        return newRooms;
      });
    }
  }

  leaveRoom(room: string) {
    this._roomsMap.update((prevRooms) => {
      if (prevRooms.has(room)) {
        const newRooms = new Map(prevRooms);
        newRooms.delete(room);
        return newRooms;
      }

      return prevRooms;
    });
  }
}
