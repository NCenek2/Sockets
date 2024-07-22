import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ChatService } from './chat.service';
import { UsersService } from '../users/users.service';
import { ChatScreenComponent } from './chat-screen/chat-screen.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent {
  @ViewChild('chatSection', { static: false })
  chatScreen?: ElementRef<HTMLDivElement>;

  chatService = inject(ChatService);
  usersService = inject(UsersService);
  username = this.usersService.username;

  currentRoom = this.chatService.currentRoom;

  public scrollToBottom(): void {
    if (this.chatScreen && this.chatScreen.nativeElement) {
      this.chatScreen.nativeElement.scrollTop =
        this.chatScreen.nativeElement.scrollHeight;
    }
  }
}
