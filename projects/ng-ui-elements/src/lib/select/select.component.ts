import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
  ContentChildren,
  forwardRef,
  QueryList,
  AfterContentInit,
  ViewChild,
  ElementRef,
  Injector,
  Self,
  Optional,
  AfterViewInit,
  Renderer2
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {OptionComponent} from './option/option.component';
import {flatten} from '@angular/compiler';

let nextSelectId = 0;

const HEIGHT = 140;

export class SelectChange {
  constructor(
    public source: OptionComponent | OptionComponent[],
    public value: any
  ) {}
}

@Component({
  selector: 'ng-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: SelectComponent, multi: true}
  ],
  host: {
    '[attr.id]': 'id',
    class: 'ng-select',
    '[class.ng-select-focus]': 'focus',
    '[class.ng-select-disabled]': 'disabled',
    '[class.ng-select-scroll]': '_scrollable',
    '[class.ng-select-not-empty]': 'empty',
    '[class.ng-open]': 'isPenelOpen',
    '[class.ng-select-required]': 'required',
    '[attr.aria-required]': 'required',
    '[attr.aria-disabled]': 'disabled.toString()',
    '[attr.disabled]': 'disabled'
  }
})
export class SelectComponent
  implements OnInit, ControlValueAccessor, AfterContentInit, AfterViewInit {
  private _id = `ng_select_${++nextSelectId}`;
  private _value: string | string[] = [];
  private _label: string;
  private _required: boolean;
  private _multiple: boolean;
  private _selected: OptionComponent | null = null;
  private _multipleArray: any[] = [];
  private _multipleOptionArray: any[] = [];
  private _optionsComponents: OptionComponent | OptionComponent[] = [];
  private _isPanelOpen = false;
  private _disabled: boolean;
  _scrollable: boolean;

  @Output()
  change: EventEmitter<SelectChange> = new EventEmitter<SelectChange>();

  @ViewChild('options') _optionsPanel: ElementRef;
  @ViewChild('selectContainer') _selectContainer: ElementRef;

  @ContentChildren(forwardRef(() => OptionComponent), {descendants: true})
  options: QueryList<OptionComponent>;

  focus: boolean;

  _onValueChange(value: any) {}

  _onTouch() {}

  @Input()
  get id() {
    return this._id;
  }

  set id(val: any) {
    this._id = val;
  }

  @Input()
  get value() {
    return !this.disabled ? this._value : null;
  }

  set value(val: string | string[]) {
    this._value = val;
  }

  @Input()
  get label() {
    return this._label;
  }

  set label(val: string) {
    this._label = val;
  }

  @Input()
  get multiple() {
    return this._multiple;
  }

  set multiple(val: boolean) {
    this._multiple = val;
  }

  @Input()
  get required() {
    return this._required;
  }

  set required(val: boolean) {
    this._required = val;
  }

  @Input('disabledControl')
  get disabled() {
    return this._disabled;
  }
  set disabled(val: boolean) {
    this._disabled = val;
  }

  setDisabledState(val: boolean) {
    this.disabled = val;
  }

  get selected(): OptionComponent {
    return this._selected;
  }

  set selected(selected: OptionComponent) {
    this._selected = selected;

    if (this.multiple) {
      if (this.selected.value === null || this.selected.value === undefined) {
        this.updateValueAsNull();
        return;
      }

      const indexOf = this._multipleArray.indexOf(selected.value);

      if (indexOf === -1) {
        this._multipleArray.push(selected.value);
        this._multipleOptionArray.push(selected);
      } else {
        this._multipleArray.splice(indexOf, 1);
        this._multipleOptionArray.splice(indexOf, 1);
      }
      this.value = this._multipleArray.length > 0 ? this._multipleArray : null;
      this.optionsComponents = this._multipleOptionArray;
    } else {
      this.value = selected ? selected.value : null;
    }
    this._onValueChange(this.value);
    this._onTouch();
  }

  get empty() {
    let isEpmty = false;
    if (this.value instanceof Object) {
      isEpmty = this.value.length > 0 ? true : false;
    } else if (typeof this.value === 'string') {
      isEpmty = this.value ? true : false;
    }

    return isEpmty;
  }

  get optionsComponents() {
    return this._optionsComponents;
  }

  set optionsComponents(
    optionsComponents: OptionComponent | OptionComponent[]
  ) {
    this._optionsComponents = optionsComponents;
  }

  get isPenelOpen() {
    return this._isPanelOpen;
  }

  set isPenelOpen(val: boolean) {
    this._isPanelOpen = val;
  }

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    document.addEventListener('click', (e: Event) => {
      if (!this.disabled) {
        this.isPenelOpen = false;
        this.focus = false;
      }
    });
  }

  ngAfterContentInit() {
    if (!this.disabled && this.options) {
      if (this.multiple) {
        this.updateMulitipleValue();
      } else {
        this.updateSingleValue();
      }
    }
  }

  ngAfterViewInit() {}

  updateValueAsNull() {
    this.value = null;
    this.isPenelOpen = false;
    this.focus = false;
    this._multipleArray = [];
    this._multipleOptionArray = [];
    this._onValueChange(this.value);
    this._onTouch();
  }

  private updateSingleValue(): any {
    this.setOptionAsUnchecked();

    this.options.forEach(option => {
      if (this.value === option.value) {
        option.checked = true;
        this.selected = option;
      }
    });
  }

  private updateMulitipleValue() {
    this.setOptionAsUnchecked();

    if (this.value instanceof Array) {
      this._multipleOptionArray = [];
      this._multipleArray = [];

      this.value.map(value => {
        this.options.forEach(option => {
          if (option.value === value) {
            option.checked = true;
            this._multipleOptionArray.push(option);
            this._multipleArray.push(option.value);
          }
        });
      });
    }
  }

  setOptionAsUnchecked() {
    this.options.forEach(option => {
      option.checked = false;
    });
  }
  writeValue(val: any): void {
    this.value = val;
  }

  registerOnChange(fn: any): void {
    this._onValueChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouch = fn;
  }

  _onSelectClick(e: Event) {
    e.stopPropagation();

    if (this.disabled) {
      return;
    }

    this.focus = !this.focus;
    this.isPenelOpen = !this.isPenelOpen;

    if (this.isPenelOpen) {
      this.updateSelectedValue();
      this._shouldScroll();
    }
  }

  _shouldScroll() {
    setTimeout(() => {
      const height = this._optionsPanel.nativeElement.offsetHeight;

      if (height > HEIGHT) {
        this.renderer.setStyle(this.optionsPanel, 'height', HEIGHT + 'px');
        this.renderer.setStyle(this.optionsPanel, 'max-height', HEIGHT + 'px');
        this._scrollable = true;
      } else {
        this.renderer.setStyle(this.optionsPanel, 'height', 'auto');
        this.renderer.setStyle(this.optionsPanel, 'max-height', 'auto');
        this._scrollable = false;
      }
    }, 1);
  }

  _onFocus(e: Event, type: boolean) {
    e.stopPropagation();
  }

  _blur() {
    if (this.disabled) {
      return;
    }
    this._onTouch();
  }

  private updateSelectedValue() {
    setTimeout(() => {
      if (this.multiple) {
        this.updateMulitipleValue();
      } else {
        this.updateSingleValue();
      }
    });
  }

  _emitSelectChange() {
    let selectList: any | any[] = [];

    selectList = this.multiple ? this.optionsComponents : this.selected;

    this.change.emit(new SelectChange(selectList, this.value));
  }

  public getValueText() {
    if (this.multiple) {
      return this.value ? this.getSelectedText() : '';
    } else {
      return this.value && this.selected ? this.selected.text : '';
    }
  }

  getSelectedText(): string {
    const result: string[] = [];
    this._multipleOptionArray.map((value, i) => {
      result.push(value.text);
    });
    return result.join();
  }

  get optionsPanel() {
    return this._optionsPanel.nativeElement;
  }
}
