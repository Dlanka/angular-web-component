import {Component, forwardRef, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

let nextCheckbox = 1;

@Component({
    selector: 'app-checkbx',
    templateUrl: './checkbx.component.html',
    styleUrls: ['./checkbx.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CheckbxComponent),
            multi: true
        }
    ],
    host: {
        'class': 'ng-checkbox',
        '[attr.id]': 'id',
        '(click)': 'onCheckBoxState($event)'
    }
})
export class CheckbxComponent implements OnInit, ControlValueAccessor {

    uniqueId = `ng-checkbox_${nextCheckbox++}`;
    onChange: any = () => {
    };
    onTouched: any = () => {
    };

    @ViewChild('input') _inputElement;

    @Input('value') _value = false;

    @Input()
    get id() {
        return this._id || this.uniqueId;
    }

    set id(val: string) {
        this._id = val;
    }

    constructor() {
    }

    ngOnInit() {
    }

    get value() {
        return this._value;
    }

    set value(val: any) {
        this._value = val;
        this.onChange(val);
        this.onTouched();
    }

    writeValue(value: any): void {
        if (value !== undefined) {
            this._value = value;
        }
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    onCheckBoxState(e) {
        e.preventDefault();
        this.value = !this.value;
        this.writeValue(this.value);
    }


}
