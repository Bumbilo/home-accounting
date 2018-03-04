import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { UserService } from './shared/services/user.service';
import { AuthService } from './shared/services/auth.service';
import { SystemModule } from './system/system.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AuthModule,
    AppRoutingModule,
    SystemModule
  ],
  providers: [UserService, AuthService, BrowserAnimationsModule],
  bootstrap: [AppComponent]
})
export class AppModule {
}
