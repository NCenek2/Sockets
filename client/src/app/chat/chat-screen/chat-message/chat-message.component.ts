import { Component, computed, inject, input } from '@angular/core';
import { SocketService } from '../../../socket/socket.service';
import { MessageDto } from '../../../models/Message.dto';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.css',
})
export class ChatMessageComponent {
  message = input.required<MessageDto>();
  socketService = inject(SocketService);

  isOwnMessage = computed(
    () => this.socketService.socketId() === this.message().id
  );
}
