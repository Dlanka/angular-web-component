import {Component, forwardRef, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

let nextCheckbox = 1;

@Component({
    selector: 'ng-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CheckboxComponent),
            multi: true
        }
    ],
    host: {
        'class': 'ng-checkbox',
        '[attr.id]': 'id',
        '(click)': 'onCheckBoxState($event)'
    }
})
export class CheckboxComponent implements OnInit, ControlValueAccessor {

    uniqueId = `ng-checkbox_${nextCheckbox++}`;

    _checked = false;
    _id: string;

    onChange: any = () => {
    };

    onTouch: any = () => {
    };


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

    get checked(): boolean {
        return this._checked;
    }

    set checked(val: boolean) {
        this._checked = val;
        this.onChange(val);
        this.onTouch();
    }

    writeValue(val: any): void {
        this.checked = val;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    onCheckBoxState(e) {
        e.preventDefault();
        this.checked = !this.checked;
    }

}
