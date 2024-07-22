import { NgModule } from '@angular/core';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { ChatScreenComponent } from './chat-screen/chat-screen.component';
import { ChatComponent } from './chat.component';
import { FormsModule } from '@angular/forms';
import { ChatRoomComponent } from './chat-rooms/chat-room/chat-room.component';
import { ChatRoomsComponent } from './chat-rooms/chat-rooms.component';
import { ChatJoinRoomComponent } from './chat-join-room/chat-join-room.component';
import { ChatService } from './chat.service';
import { ChatMessageComponent } from './chat-screen/chat-message/chat-message.component';

@NgModule({
  imports: [FormsModule],
  providers: [ChatService],
  declarations: [
    ChatComponent,
    ChatScreenComponent,
    ChatBoxComponent,
    ChatRoomComponent,
    ChatRoomsComponent,
    ChatJoinRoomComponent,
    ChatMessageComponent
  ],
  exports: [ChatComponent],
})
export class ChatModule {}
