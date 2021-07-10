import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonLoadComponent } from '../skeleton-load/skeleton-load.component';



@NgModule({
  declarations: [SkeletonLoadComponent],
  imports: [
    CommonModule
  ],
  exports: [SkeletonLoadComponent]
})
export class SkeletonLoaderModule { }
