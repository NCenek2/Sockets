import { Component, computed, inject } from '@angular/core';
import { ChatService } from '../chat.service';
import { SocketService } from '../../socket/socket.service';

@Component({
  selector: 'app-chat-rooms',
  templateUrl: './chat-rooms.component.html',
  styleUrl: './chat-rooms.component.css',
})
export class ChatRoomsComponent {
  chatService = inject(ChatService);
  socketService = inject(SocketService);

  currentRoom = this.chatService.currentRoom;
  rooms = computed(() => Array.from(this.chatService.rooms().keys()));

  leaveRoom() {
    this.socketService.leaveRoomEmitter();
  }
}
