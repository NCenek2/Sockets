import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users/users.service';

declare var bootstrap: any;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  username = signal<string>('');
  router = inject(Router);
  usersService = inject(UsersService);

  ngOnInit(): void {
    const myModal = new bootstrap.Modal(
      document.getElementById('staticBackdrop'),
      {
        backdrop: 'static',
        keyboard: false,
      }
    );
    myModal.show();
  }

  enterChat() {
    this.usersService.setUserName(this.username());
    this.router.navigate(['/chat']);
  }
}
