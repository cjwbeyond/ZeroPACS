import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Pipe,
  PipeTransform,
  Renderer2
} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = { asc: 'desc', desc: '', '': 'asc' };

export interface SortEvent {
  column: string;
  direction: SortDirection;
}

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: 'th[sortable]',
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})

export class AdvancedSortableDirective implements OnInit{

  constructor(private renderer2: Renderer2,
              private elementRef: ElementRef) { }
  @Input() sortable: string  = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.sortable, direction: this.direction });
  }

  ngOnInit(): void {
    const ele = this.elementRef.nativeElement;
    const spanNode = this.renderer2.createElement('span');
    this.renderer2.appendChild(spanNode, ele.lastChild);
    this.renderer2.appendChild(ele, spanNode);
  }

}
