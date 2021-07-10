import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'skeleton-load',
  template: `
  <div class="flex">
    <div [ngStyle]="getStyles()" class="skel-loader loader"></div>
    <div *ngIf="content" class="content"></div>
  </div>
  `,
  styleUrls: ['./skeleton-load.component.css']
})
export class SkeletonLoadComponent implements OnInit {

  @Input() Cwidth;
  @Input() Cheight;
  @Input() circle: boolean;
  @Input() content: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  getStyles() {
    const myStyles = {
      'width.px': this.Cwidth ? this.Cwidth : '',
      'height.px': this.Cheight ? this.Cheight : '',
      'border-radius': this.circle ? '50%' : ''
    };
    return myStyles;
  }

}
