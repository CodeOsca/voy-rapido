import {
  Component,
  ContentChild,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
} from '@angular/core';

@Component({
  selector: 'app-scroll',
  templateUrl: './scroll.component.html',
  styleUrls: ['./scroll.component.scss'],
})
export class ScrollComponent implements OnInit {
  @ContentChild('home') home: ElementRef;
  @ContentChild('comuna') comuna: ElementRef;
  @ContentChild('nosotros') nosotros: ElementRef;
  @ContentChild('estandares') estandares: ElementRef;
  @ContentChild('servicios') servicios: ElementRef;
  @ContentChild('seccion1') seccion1: ElementRef;
  @ContentChild('seccion2') seccion2: ElementRef;
  @ContentChild('seguimiento') seguimiento: ElementRef;
  @ContentChild('contactanos') contactanos: ElementRef;
  @ContentChild('iconos') iconos: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {}

  @HostListener('window:scroll', ['$event'])
  oSomethingOnWindowsScroll($event: any) {
    const posTopView = $event.srcElement.children[0].scrollTop;
    const scrollPosition = posTopView + window.innerHeight;

    this.sectionVisible(
      this.home.nativeElement,
      this.home.nativeElement.offsetTop,
      scrollPosition
    );
    this.sectionVisible(
      this.comuna.nativeElement,
      this.comuna.nativeElement.offsetTop,
      scrollPosition
    );
    this.sectionVisible(
      this.nosotros.nativeElement,
      this.nosotros.nativeElement.offsetTop,
      scrollPosition
    );
    this.sectionVisible(
      this.estandares.nativeElement,
      this.estandares.nativeElement.offsetTop,
      scrollPosition
    );
    this.sectionVisible(
      this.servicios.nativeElement,
      this.servicios.nativeElement.offsetTop,
      scrollPosition
    );
    this.sectionVisible(
      this.seccion1.nativeElement,
      this.seccion1.nativeElement.offsetTop,
      scrollPosition
    );
    this.sectionVisible(
      this.seccion2.nativeElement,
      this.seccion2.nativeElement.offsetTop,
      scrollPosition
    );
    this.sectionVisible(
      this.seguimiento.nativeElement,
      this.seguimiento.nativeElement.offsetTop,
      scrollPosition
    );
    this.sectionVisible(
      this.contactanos.nativeElement,
      this.contactanos.nativeElement.offsetTop,
      scrollPosition
    );
    this.sectionVisible(
      this.iconos.nativeElement,
      this.iconos.nativeElement.offsetTop,
      scrollPosition
    );
  }

  sectionVisible(section: any, position: any, scrollPosition: any) {
    if (position < scrollPosition)
      this.renderer.addClass(section, 'ver-seccion');
    else this.renderer.removeClass(section, 'ver-seccion');
  }
}
