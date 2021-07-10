import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  SocialUser,
  SocialAuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from "angularx-social-login";
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Subscription } from 'rxjs';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  faGoogle = faGoogle;

  user: SocialUser;
  loggedIn: boolean;

  subscriber: Subscription;
  content_2_ratio: number = 0;

  constructor(private http: HttpClient,
    private authService: SocialAuthService) {
  }

  ngOnInit(): void {
    window.innerWidth > 810 ? this.content_2_ratio = 0.2 : this.content_2_ratio = 0.3
    this.subscriber = this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(this.user);
      console.log(this.loggedIn);
    });
  }

  options: AnimationOptions = {
    path: '/assets/document.json',
    loop: false
  };

  options1: AnimationOptions = {
    path: '/assets/document1.json',
    loop: false
  };

  options2: AnimationOptions = {
    path: '/assets/document2.json',
    loop: false
  };

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

}
