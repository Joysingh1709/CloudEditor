import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-new-doc',
  templateUrl: './new-doc.component.html',
  styleUrls: ['./new-doc.component.css']
})
export class NewDocComponent implements OnInit {

  docName: string;

  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpService: HttpService) {
    this.docName = data.docName;
  }

  ngOnInit(): void {
  }

  create() {
    this.httpService.createNewDocument({
      owner: this.data.owner,
      content: this.data.content,
      members: this.data.members,
      docName: this.docName
    }).subscribe((res) => {
      if (res.result.status === 'success') {
        console.log("new document created with :");
        console.log(res.result);
        this.dialogRef.close(res.result);
      }
    })
  }

}
