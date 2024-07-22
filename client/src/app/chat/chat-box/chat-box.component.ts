import { Component, inject, output, signal } from '@angular/core';
import { SocketService } from '../../socket/socket.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrl: './chat-box.component.css',
})
export class ChatBoxComponent {
  message = signal<string>('');
  private socketService = inject(SocketService);
  scrollToBottomEvent = output<void>();

  send() {
    if (this.message() === '') return;
    this.scrollToBottomEvent.emit();
    this.message.set(this.socketService.messageEmitter(this.message()));
  }
}
