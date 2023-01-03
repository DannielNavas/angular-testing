import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[highligth]',
})
export class HighligthDirective implements OnChanges {
  defaultColor = 'gray';
  @Input('highligth') bgColor = '';
  constructor(private elementRef: ElementRef) {
    this.elementRef.nativeElement.style.backgroundColor = this.defaultColor;
  }
  ngOnChanges(): void {
    this.elementRef.nativeElement.style.backgroundColor =
      this.bgColor || this.defaultColor;
  }
}
