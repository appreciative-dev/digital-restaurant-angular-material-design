import {
  Directive,
  ElementRef,
  Renderer2,
  HostListener,
  Input,
} from '@angular/core'

@Directive({
  selector: '[mouseOnHover]',
})
export class MouseOnHoverDirective {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {}

  @Input() defaultColor

  @HostListener('mouseenter') mouseenter() {
    console.log('mouseenter')

    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'background-color',
      this.defaultColor
    )
  }

  @HostListener('mouseleave') mouseleave() {
    console.log('mouseleave')
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'background-color',
      'transparent'
    )
  }
}
