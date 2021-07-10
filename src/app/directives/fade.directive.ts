import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appFade]'
})
export class FadeDirective {

  initialTop: number = 0
  offset: number;

  constructor(private el: ElementRef) {
    this.initialTop = this.el.nativeElement.getBoundingClientRect().top;
    window.innerWidth > 810 ? this.offset = 200 : this.offset = 350;
  }

  @HostListener("window:scroll", ["$event"])
  onWindowScroll(event) {
    var h: number = this.el.nativeElement.offsetHeight;
    if (window.scrollY > this.offset) {
      console.log(window.scrollY)
      this.el.nativeElement.style.opacity = ((this.initialTop - (window.scrollY - this.offset) / 100) + 1);
    } else {
      this.el.nativeElement.style.opacity = 1;
    }
  }

}
