import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { WebhooksService } from '../services/webhooks.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../services/http.service';
import { IgxToastComponent } from 'igniteui-angular';
import { SocialAuthService } from 'angularx-social-login';
import { ShareDialogComponent } from '../dialogs/share-dialog/share-dialog.component';

@Component({
  selector: 'app-texteditor',
  templateUrl: './texteditor.component.html',
  styleUrls: ['./texteditor.component.css']
})
export class TexteditorComponent implements OnInit {

  userID: string;

  editFlag: boolean = false;

  quillForm: FormGroup;

  id: string = '';

  toastMessage: string = "Saving Document...";
  showLoader: boolean = true;

  constructor(private webhooks: WebhooksService,
    private fb: FormBuilder,
    private router: Router,
    @Inject('BaseUrl') private baseUrl,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private http: HttpClient,
    private httpService: HttpService,
    private authService: SocialAuthService) {
  }

  @ViewChild('toast') toast: IgxToastComponent;

  ngOnInit(): void {
    this.route.params.subscribe((val) => {
      this.id = val.id;
      this.userID = val.user;
    })
    this.quillForm = this.fb.group({
      description: [``]
    });
    this.webhooks.joinRoom(this.id, this.userID);
    this.webhooks.listen('docEditEvent', this.id).subscribe((data: any) => {
      data._id === this.userID ? this.editFlag = true : this.editFlag = false;
      data._id === this.userID ? null : this.quillForm.get('description').patchValue(data.data === null ? `` : data.data);
    });

    this.http.get(`${this.baseUrl}getDoc/${this.id}`, { withCredentials: true, responseType: 'json' })
      .subscribe((res: any) => {
        // console.log(res.data.content);
        this.quillForm.get('description').setValue(res.data.content);
      })
  }

  onkeypress(event) {
    let charCode = String.fromCharCode(event.which).toLowerCase();
    if (event.ctrlKey && charCode === 's') {
      this.saveDoc();
      event.preventDefault();
    }
  }

  openShareDialog() {
    const dialogRef = this.dialog.open(ShareDialogComponent, {
      width: '500px',
      data: {
        docId: this.id,
        userId: this.userID
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  saveDoc() {
    this.toast.open();
    this.showLoader = true;
    var dataToSave = {
      id: this.id,
      content: this.quillForm.value.description
    }
    this.httpService.saveDocument(dataToSave).subscribe((data) => {
      console.log(data.result);
      this.showLoader = false;
      this.toastMessage = "Document saved"
      setTimeout(() => {
        this.toast.close();
      }, 2000);
    })
  }

  textSelectionchange(event) {
    // console.log("selection event");
    // console.log(event);
  }

  onEditorCreatedChange(event) {
    // console.log("Editor Created Changed event");
    // console.log(event);
  }
  onEditorChangedChange(event) {
    // console.log("EditorChanged event");
    // console.log(event);
  }

  onFocusChange(event) {
    this.editFlag = true;
  }
  onBlurChange(event) {
    this.editFlag = false;
  }

  textchange(event) {
    // console.log("edit event");
    // console.log("this.editFlag :", this.editFlag);
    // console.log(event);
    if (this.editFlag) {
      let data = {
        _id: this.userID,
        room: this.id,
        data: event.html
      }
      this.webhooks.emit('docEditEvent', data);
      this.editFlag = false;
    }
    else {
      this.editFlag = true;
    }
  }

}
