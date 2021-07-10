import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { HttpService } from '../services/http.service';

@Component({
  templateUrl: './share-doc.component.html'
})
export class ShareDocComponent {

  constructor(private router: Router,
    private route: ActivatedRoute,
    private httpService: HttpService,
    private authService: SocialAuthService) {
    this.route.params.subscribe((res) => {
      console.log(res.userId);
      console.log(res.docId);
      console.log(res.role);
      this.authService.authState.subscribe((authData) => {
        if (authData) {
          if (authData.id !== res.userId) {
            this.httpService.getUser(res.userId).subscribe((getUser_res) => {
              if (getUser_res.result.status === 'success') {
                let body = {
                  userId: res.userId,
                  docId: res.docId,
                  role: res.role,
                  sharedTo: authData.id
                }
                this.httpService.shareDocument(body).subscribe((share_doc_res) => {
                  if (share_doc_res.result.status === 'success') {
                    this.router.navigate([share_doc_res.result.redirectTo]);
                  }
                  else {
                    this.router.navigate(['docs']);
                  }
                })
              } else {
                this.router.navigate(['login']);
              }
            });
          } else if (authData.id === res.userId) {
            this.router.navigate([`text-editor/${res.docId}/${authData.id}`]);
          }
        } else {
          this.router.navigate(['login']);
        }
      });
    });
  }

}
