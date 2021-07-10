import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { Subscription } from 'rxjs';
import { HttpService } from '../services/http.service';
import { MatDialog } from '@angular/material/dialog';

import { faPlusSquare } from '@fortawesome/free-regular-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { NewDocComponent } from '../dialogs/new-doc/new-doc.component';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.css']
})
export class DocsComponent implements OnInit, OnDestroy {
  docs: any;
  sharedDocData: any;
  subscriber: Subscription;
  userId: string;

  faPlusSquare = faPlusSquare;
  faPlus = faPlus;

  constructor(private httpService: HttpService,
    private auth: SocialAuthService,
    private dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    this.subscriber = this.auth.authState.subscribe((res) => {
      console.log(res)
      if (res) {
        this.userId = res.id;
        this.httpService.getallUserDocs(res.id).subscribe((data) => {
          if (data.result.status === 'success') {
            this.docs = data.result.docs;
          }
        })

        this.httpService.getAllUserSharedDocs(res.id).subscribe((shared_data) => {
          console.log(shared_data)
          if (shared_data.result.status === 'success') {
            this.sharedDocData = shared_data.result.docs;
          }
        })
      }
    })
  }

  createNewDoc(): void {
    const dilogRef = this.dialog.open(NewDocComponent, {
      width: '380px',
      data: {
        owner: this.userId,
        content: '',
        members: [],
        docName: this.getNewDocName()
      }
    });

    dilogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.router.navigate([`text-editor/${result.id}/${this.userId}`]);
      }
    })
    this.httpService
  }

  getNewDocName(): string {
    let date = new Date();
    return 'doc-' + date.getFullYear() + '-' + date.getTime();
  }

  onDocSelect(idx) {
    this.router.navigate([`text-editor/${this.docs[idx].id}/${this.userId}`]);
  }

  onDharedDocSelect(idx) {
    this.router.navigate([`text-editor/${this.sharedDocData[idx].id}/${this.userId}`]);
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

}
