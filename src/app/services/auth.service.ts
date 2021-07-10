import { Inject, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocialUser, SocialAuthService, FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user = new BehaviorSubject(null);
  currentUserData = this.user.asObservable();

  constructor(private http: HttpClient,
    private router: Router,
    @Inject('BaseUrl') private baseUrl,
    private authService: SocialAuthService) {
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((data) => {
      this.http.get(`${this.baseUrl}getUser/${data.id}`, { withCredentials: true })
        .subscribe((res: any) => {
          if (res.result.status === 'success') {
            this.user.next(data);
            this.router.navigate(['docs']);
          }
          else if (res.result.status === 'user not found') {
            console.log("user not found error");
            let body = {
              id: data.id,
              photoUrl: data.photoUrl,
              name: data.name,
              email: data.email
            }

            this.http.post(`${this.baseUrl}addUser`, body, { withCredentials: true })
              .subscribe((res: any) => {
                if (res.result.status === 'success')
                  console.log("user created in database");
                this.user.next(data);
                this.router.navigate(['docs']);
              })
          }
        })
    })
      .catch((err) => console.log("error : ", err));
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((res) => {
      console.log(res);
    })
      .catch((err) => console.log("error : ", err));
  }

  signOut(): void {
    this.authService.signOut().then((res) => {
      this.user.next(null);
      this.router.navigate(['login']);
    });
  }
}
