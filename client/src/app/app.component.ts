import { Component, inject, OnInit } from '@angular/core';
import { SocketService } from './socket/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private socketService = inject(SocketService);

  ngOnInit(): void {
    this.socketService.setSocket();
    this.socketService.subscribe();
  }
}
