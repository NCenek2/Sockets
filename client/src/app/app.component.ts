import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SocketService } from './socket/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [HeaderComponent, RouterOutlet],
})
export class AppComponent implements OnInit {
  private socketService = inject(SocketService);

  ngOnInit(): void {
    this.socketService.setSocket();
    this.socketService.subscribe();
  }
}
