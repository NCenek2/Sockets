import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { UsersService } from '../users/users.service';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { ChatRoomsComponent } from './chat-rooms/chat-rooms.component';
import { ChatScreenComponent } from './chat-screen/chat-screen.component';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
  imports: [ChatScreenComponent, ChatBoxComponent, ChatRoomsComponent],
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
