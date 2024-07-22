import { Component, computed, inject } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat-screen',
  templateUrl: './chat-screen.component.html',
  styleUrl: './chat-screen.component.css',
})
export class ChatScreenComponent {
  chatService = inject(ChatService);

  messages = computed(() => {
    if (this.chatService.rooms().has(this.chatService.currentRoom())) {
      return this.chatService.rooms().get(this.chatService.currentRoom());
    }

    return [];
  });
}
