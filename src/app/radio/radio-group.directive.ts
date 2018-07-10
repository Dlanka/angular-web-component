import {
    AfterContentInit,
    ContentChildren,
    Directive,
    EventEmitter,
    forwardRef,
    Input,
    Output,
    QueryList
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

import {RadioComponent} from './radio.component';

let nextId = 0;

export class RadioChange {
    constructor(public source: RadioComponent,
                public value: any) {
    }
}

@Directive({
    exportAs: 'radioGroup',
    selector: 'radio-group',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RadioGroupDirective),
            multi: true
        }
    ]
})
export class RadioGroupDirective implements AfterContentInit, ControlValueAccessor {

    private _id: string;
    private _value: any;
    private _name = `ng-radio-group_${++nextId}`;
    private _required = false;
    private _selected: RadioComponent | null = null;
    private _disabled = false;

    _controlValueChangeFn: (value: any) => void = () => {
    }

    onTouchFn: () => void = () => {
    }

    constructor() {
    }

    @Output() readonly change: EventEmitter<RadioChange> = new EventEmitter<RadioChange>();

    @ContentChildren(forwardRef(() => RadioComponent), {descendants: true})
    radioList: QueryList<RadioComponent>;

    @Input()
    get selected(): RadioComponent {
        return this._selected;
    }

    set selected(selected: RadioComponent) {
        this._selected = selected;
        this.value = selected ? selected.value : null;
    }

    @Input()
    get name(): string {
        return this._name;
    }

    set name(val: string) {
        this._name = val;
    }

    @Input()
    get value(): any {
        return this._value;
    }

    set value(val: any) {
        this._value = val;
    }

    @Input()
    get id(): string {
        return this._id;
    }

    set id(val: string) {
        this._id = val;
    }

    @Input()
    get disabled(): boolean {
        return this._disabled;
    }

    set disabled(val) {
        this._disabled = val;
    }

    ngAfterContentInit() {
        console.log(this.radioList);
    }

    writeValue(val: any): void {
        this.value = val;
    }

    registerOnChange(fn: (val: any) => void): void {
        this._controlValueChangeFn = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouchFn = fn;
    }

    _emitChanged() {
        this.change.emit(new RadioChange(this.selected, this.value));
    }
}
