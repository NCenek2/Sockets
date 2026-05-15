import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../users/users.service';

declare var bootstrap: any;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
  imports: [FormsModule],
})
export class ModalComponent {
  username = model('');
  router = inject(Router);
  usersService = inject(UsersService);

  private myModal: any;

  ngOnInit(): void {
    this.myModal = new bootstrap.Modal(
      document.getElementById('staticBackdrop'),
      {
        backdrop: 'static',
        keyboard: false,
      },
    );
    this.myModal.show();
  }

  enterChat() {
    this.usersService.setUserName(this.username());
    this.router.navigate(['/chat']);
    this.myModal.hide();
  }
}
