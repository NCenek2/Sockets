import { Component, computed, inject, input } from '@angular/core';
import { ChatService } from '../../chat.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.css',
})
export class ChatRoomComponent {
  room = input.required<string>();
  private chatService = inject(ChatService);

  isActive = computed(() => this.chatService.currentRoom() === this.room());

  changeCurrentRoom() {
    this.chatService.setCurrentRoom(this.room());
  }
}
