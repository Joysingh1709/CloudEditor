import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { faCopy } from '@fortawesome/free-regular-svg-icons'
import { MatTooltip } from '@angular/material/tooltip';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-share-dialog',
  templateUrl: './share-dialog.component.html',
  styleUrls: ['./share-dialog.component.css']
})
export class ShareDialogComponent implements OnInit {

  tooltipMsg = "Copy link"
  faCopy = faCopy;
  link: string = "";
  showLink: boolean = false;
  loading: boolean = false;

  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.toppings.valueChanges.subscribe((res) => {
      this.showLink = false;
      this.link = "";
    });
  }

  @ViewChild('tooltip') tooltip: MatTooltip;
  onToolTipClick() {
    this.tooltipMsg = "Link copied"
    this.tooltip.show();
  }

  createLink(): void {
    this.loading = true;
    setTimeout(() => {
      this.showLink = true;
      this.link = `http://localhost:4200/share-doc/${this.data.userId}/${this.data.docId}/${this.toppings.value}`
      this.loading = false;
    }, 2000);
  }

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits: any[] = [];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: any): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  toppings = new FormControl('View');

  toppingList: string[] = ['View', 'Edit'];

}
