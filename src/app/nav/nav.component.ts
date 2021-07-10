import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { SocialUser, SocialAuthService, FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { faFile, faFileAlt, faSave, faShareSquare } from '@fortawesome/free-regular-svg-icons'
import { faFileMedical, faShare, faShareAlt, faShareAltSquare } from '@fortawesome/free-solid-svg-icons'
import { AuthService } from '../services/auth.service';
import { faGoogle, faCreativeCommonsShare, faSlideshare } from '@fortawesome/free-brands-svg-icons'
import { CommonServices } from '../services/common.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  faShareAlt = faShareAlt;
  faFileMedical = faFileMedical;
  faSave = faSave;
  faGoogle = faGoogle;
  faFile = faFile;
  faFileAlt = faFileAlt;
  user: SocialUser;
  loggedIn: boolean;

  members_arr = [];

  docName;

  @Input('share') share: boolean;
  @Input('members') members: any;
  @Input('doc_Id') docId: string;
  @Input('user_Id') userId: string;

  constructor(private http: HttpClient,
    private authService: SocialAuthService,
    private commonServices: CommonServices,
    private auth: AuthService) {
  }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  shareDoc() {
    this.commonServices.openShare(this.docId, this.userId).then((res) => {
      console.log(" from nav : ", res);
    })
  }

  signUp() {
    this.auth.signInWithGoogle();
  }

  signOut() {
    this.auth.signOut();
  }

}
