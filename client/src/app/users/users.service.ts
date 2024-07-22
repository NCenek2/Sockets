import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private _username = signal<string>('');
  username = this._username.asReadonly();

  setUserName(usrname: string) {
    this._username.set(usrname);
  }
}
