import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  Self,
  Optional,
  Output,
  EventEmitter,
  ContentChild,
  ViewChild,
  ElementRef
} from '@angular/core';
import {SelectComponent} from '../select.component';

let nextOption = 0;

export class OptionChange {
  constructor(public source: OptionComponent, public value: any) {}
}

@Component({
  selector: 'ng-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[attr.id]': 'id',
    class: 'ng-option',
    '[class.ng-option-checked]': 'checked',
    '[attr.tabindex]': '0',
    '(click)': '_onOptionClick($event)'
  }
})
export class OptionComponent implements OnInit {
  private _id = `ng_option_${++nextOption}`;
  private _value: any;
  private _checked: boolean;

  selectControl: SelectComponent;

  @Output()
  change: EventEmitter<OptionChange> = new EventEmitter<OptionChange>();

  @ViewChild('text') _textContainer: ElementRef;

  constructor(public _selectControl: SelectComponent) {
    this.selectControl = _selectControl;
  }

  ngOnInit() {}

  @Input()
  get id() {
    return this._id;
  }

  set id(val: string) {
    this._id = val;
  }

  @Input()
  get value() {
    return this._value || null;
  }

  set value(val: any) {
    this._value = val;
  }

  @Input()
  get checked() {
    return this._checked;
  }

  set checked(val: any) {
    this._checked = val;
  }

  get text() {
    return this._textContainer.nativeElement.innerText;
  }

  _onOptionClick(e: Event) {
    e.preventDefault();
    e.stopPropagation();

    this.change.emit(new OptionChange(this, this.value));

    if (this.selectControl) {
      if (this.selectControl.multiple) {
        this.checked = !this.checked;
      } else {
        this.selectControl.options.forEach(option => {
          option.checked = false;
        });
        this.checked = true;
      }

      this.selectControl.selected = this;
      this.selectControl._emitSelectChange();

      if (!this.selectControl.multiple) {
        this.selectControl.isPenelOpen = false;
        this.selectControl.focus = false;
      }
    }
  }
}
