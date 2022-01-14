import { Directive, ElementRef, Input, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appFallbackText]',
})
export class FallbackTextDirective {
  @Input() data: string | undefined | null;
  htmlElement: HTMLElement;
  constructor(private element: ElementRef<HTMLElement>) {
    this.htmlElement = element.nativeElement;
  }

  ngOnChanges({ data }: SimpleChanges) {
    if (data) {
      const { currentValue } = data;
      !!currentValue?.trim()
        ? this.originalText(currentValue)
        : this.fallbackText();
    }
  }
  ngAfterContentInit(): void {
    const value = this.htmlElement.textContent?.trim();
    if (!value) {
      this.fallbackText();
    }
  }

  private fallbackText() {
    this.htmlElement.style.fontSize = '12px';
    this.htmlElement.style.color = 'red';
    this.htmlElement.innerHTML = 'Sin especificar';
  }
  private originalText(text: string) {
    this.htmlElement.style.fontSize = '16px';
    this.htmlElement.style.color = 'black';
    this.htmlElement.innerHTML = text;
  }
}
