import { Component, computed, inject, Signal, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SocketService } from '../../socket/socket.service';

@Component({
  selector: 'app-chat-join-room',
  templateUrl: './chat-join-room.component.html',
  styleUrl: './chat-join-room.component.css',
})
export class ChatJoinRoomComponent {
  room = signal<string>('');
  canJoin: Signal<boolean> = computed(() => this.room().trim() !== '');
  private socketService = inject(SocketService);
  private router = inject(Router);

  joinRoom() {
    this.room.set(this.socketService.joinRoomEmitter(this.room()));
    this.router.navigate(['/chat']);
  }
}
