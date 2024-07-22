import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { ChatModule } from './chat/chat.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal/modal.component';
import { UsersModule } from './users/users.module';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, HeaderComponent, ModalComponent],
  imports: [
    CommonModule,
    BrowserModule,
    NgbModule,
    ChatModule,
    FormsModule,
    UsersModule,
    RouterModule.forRoot(routes, {
      bindToComponentInputs: true,
      paramsInheritanceStrategy: 'always',
    }),
  ],
})
export class AppModule {}
