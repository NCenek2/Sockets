import { Component, inject, signal } from '@angular/core';
import { SocketService } from '../../socket/socket.service';

@Component({
  selector: 'app-chat-join-room',
  templateUrl: './chat-join-room.component.html',
  styleUrl: './chat-join-room.component.css',
})
export class ChatJoinRoomComponent {
  room = signal<string>('');
  private socketService = inject(SocketService);

  joinRoom() {
    this.room.set(this.socketService.joinRoomEmitter(this.room()));
  }
}
