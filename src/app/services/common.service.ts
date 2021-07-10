import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ShareDialogComponent } from '../dialogs/share-dialog/share-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class CommonServices {

  constructor(private dialog: MatDialog) { }

  openShare(_docId: string, _userId: string): Promise<boolean> {
    var promise = new Promise<boolean>((resolve) => {

      const dialogRef = this.dialog.open(ShareDialogComponent, {
        width: '500px',
        data: {
          docId: _docId,
          userId: _userId
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
        resolve(result ? true : false);
      });

    });
    return promise;
  }
}
