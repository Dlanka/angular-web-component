import {
    AfterContentInit,
    ContentChildren,
    Directive,
    EventEmitter,
    forwardRef,
    Input,
    Output, QueryList
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

import {RadioComponent} from './radio/radio.component';

let nextId = 0;

export class RadioChange {
    constructor(public source: RadioComponent,
                public value: any) {
    }
}

@Directive({
    exportAs: 'ngRadioGroup',
    selector: 'ng-radio-group',
    host: {
        'class': 'ng-radio-group',
        '[class.ng-radio-group-disabled]': 'disabledGroup'
    },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RadioGroupDirective),
            multi: true
        }
    ]
})
export class RadioGroupDirective implements AfterContentInit, ControlValueAccessor {

    @Output() readonly change: EventEmitter<RadioChange> = new EventEmitter<RadioChange>();

    @ContentChildren(forwardRef(() => RadioComponent), {descendants: true})
    radios: QueryList<RadioComponent>;

    private _id: string;
    private _value: any;
    private _name = `ng-radio-group_${++nextId}`;
    private _required = false;
    private _selected: RadioComponent | null = null;
    private _disabled = false;

    _onChangeFn: (value: any) => void = () => {
    }

    onTouchFn: () => void = () => {
    }

    constructor() {
    }

    @Input()
    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    @Input()
    get value() {
        return this._value;
    }

    set value(value: any) {
        if (this.value !== value && !this.disabledGroup) {
            this._value = value;
            this._updateRadioButtonValue();
        }
    }

    private _updateRadioButtonValue() {
        setTimeout(() => {
            this.radios.forEach(radio => {
                if (this.value === radio.value && !radio.disabled) {
                    radio.checked = true;
                }
            });
        }, 1);
    }

    @Input()
    get name(): string {
        return this._name;
    }

    set name(value: string) {
        console.log('name update ', value);
        this._name = value;
        this._updateRadioButtonName();
    }

    private _updateRadioButtonName() {
        setTimeout(() => {
            if (this.radios) {
                this.radios.forEach(radio => {
                    radio.name = this.name;
                });
            }
        }, 1);
    }

    @Input()
    get required(): boolean {
        return this._required;
    }

    set required(value: boolean) {
        this._required = value;
    }

    @Input()
    get disabledGroup(): boolean {
        return this._disabled;
    }

    set disabledGroup(value: boolean) {
        this._disabled = value;
    }

    @Input()
    get selected() {
        return this._selected;
    }

    set selected(selected: RadioComponent) {
        this._selected = selected;
        this.value = selected ? selected.value : null;
    }

    ngAfterContentInit() {
        if (this.radios) {
            this.radios.forEach(radio => {
                console.log(radio);
            });
        }
    }

    writeValue(value: any): void {
        this.value = value;
    }

    registerOnChange(fn: any): void {
        this._onChangeFn = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouchFn = fn;
    }

    _emitInputChange() {
        this.change.emit(new RadioChange(this.selected, this.value));
    }

}
