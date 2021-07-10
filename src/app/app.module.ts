import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { QuillModule } from 'ngx-quill';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { IgxProgressBarModule } from "igniteui-angular";
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import {
  IgxButtonModule,
  IgxRippleModule,
  IgxToastModule
} from "igniteui-angular";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebhooksService } from './services/webhooks.service';
import { TexteditorComponent } from './texteditor/texteditor.component';
import { LoginComponent } from './login/login.component';

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavComponent } from './nav/nav.component';
import { DocsComponent } from './docs/docs.component';
import { AuthService } from './services/auth.service';
import { ShareDocComponent } from './share-doc/share-doc.component';
import { ShareDialogComponent } from './dialogs/share-dialog/share-dialog.component';
import { NewDocComponent } from './dialogs/new-doc/new-doc.component';
import { environment } from '../environments/environment';
import { SkeletonLoaderModule } from './skeleton-loader/skeleton-loader.module';

import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { ParalaxDirective } from './directives/paralax.directive';
import { FadeDirective } from './directives/fade.directive';
import { CommonServices } from './services/common.service';

// Note we need a separate function as it's required
// by the AOT compiler.
export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    TexteditorComponent,
    LoginComponent,
    NavComponent,
    DocsComponent,
    ShareDocComponent,
    ShareDialogComponent,
    NewDocComponent,
    ParalaxDirective,
    FadeDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatRippleModule,
    MatDialogModule,
    SocialLoginModule,
    FormsModule,
    LottieModule.forRoot({ player: playerFactory }),
    MatChipsModule,
    MatInputModule,
    MatSelectModule,
    IgxButtonModule,
    IgxRippleModule,
    MatTooltipModule,
    IgxToastModule,
    ReactiveFormsModule,
    SkeletonLoaderModule,
    ClipboardModule,
    MatButtonModule,
    MatIconModule,
    IgxProgressBarModule,
    HttpClientModule,
    QuillModule.forRoot(),
    BrowserAnimationsModule,
    FontAwesomeModule
  ],
  providers: [
    WebhooksService,
    AuthService,
    CommonServices,
    {
      provide: 'BaseUrl',
      useValue: environment.baseURL
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('75423922693-veo96b6vtg6rkl9vnduhto662ia7lrc0.apps.googleusercontent.com')
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
