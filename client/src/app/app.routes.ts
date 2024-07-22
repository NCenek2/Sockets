import {
  CanMatchFn,
  RedirectCommand,
  Route,
  Router,
  Routes,
  UrlSegment,
} from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { ModalComponent } from './modal/modal.component';
import { ChatJoinRoomComponent } from './chat/chat-join-room/chat-join-room.component';
import { inject } from '@angular/core';
import { UsersService } from './users/users.service';

const isAuthorized: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  const router = inject(Router);
  const usersService = inject(UsersService);

  if (!usersService.username())
    return new RedirectCommand(router.parseUrl('/'));

  return true;
};

export const routes: Routes = [
  {
    path: '',
    component: ModalComponent,
  },
  {
    path: 'chat',
    canMatch: [isAuthorized],
    children: [
      {
        path: '',
        component: ChatComponent,
      },
      {
        path: 'add-room',
        component: ChatJoinRoomComponent,
      },
    ],
  },
];
