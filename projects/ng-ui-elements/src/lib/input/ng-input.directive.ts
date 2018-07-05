import {Directive, ElementRef, Input, Optional, Self} from '@angular/core';
import {NgControl} from '@angular/forms';
import {Subject} from 'rxjs';

let nextInput = 0;

@Directive({
    selector: 'input[ngInput], textarea[ngInput]',
    exportAs: 'ngInput',
    host: {
        '[attr.id]': 'id || uId',
        '[attr.disabled]': 'disabled',
        '[attr.type]': 'type',
        '[attr.maxlength]': 'maxlength',
        '[attr.minlength]': 'minlength',
        '[attr.required]': 'required',
        '[attr.autocomplete]': 'autocomplete',
        'class': 'input',
        '(blur)': '_onFocus(false)',
        '(focus)': '_onFocus(true)'
    },
})
export class NgInputDirective {

    stateChange: Subject<any> = new Subject<void>();
    focused: boolean;

    private uId = `ng-input-${++nextInput}`;

    private _id: string;
    private _label: string;
    private _type: string;
    private _disabled: boolean;
    private _maxlength: string;
    private _minlength: string;
    private _autocomplete = 'off';
    private _required = false;

    constructor(public elementRef: ElementRef,
                @Optional() @Self() public ngControl: NgControl) {
    }

    @Input()
    get id(): string {
        return this._id || this.uId;
    }

    set id(value: string) {
        this._id = value;
    }

    @Input()
    get label(): string {
        return this._label;
    }

    set label(value: string) {
        this._label = value;
    }

    @Input()
    get autocomplete(): string {
        return this._autocomplete;
    }

    set autocomplete(val: string) {
        this._autocomplete = val;
    }

    @Input()
    get maxlength(): string {
        return this._maxlength;
    }

    set maxlength(value: string) {
        this._maxlength = value;
    }

    @Input()
    get minlength(): string {
        return this._minlength;
    }

    set minlength(value: string) {
        this._minlength = value;
    }

    @Input()
    get type(): string {
        return this._type;
    }

    set type(value: string) {
        this._type = value || 'text';
    }

    @Input()
    get disabled(): boolean {
        return this._disabled;
    }

    set disabled(value: boolean) {
        this._disabled = value;
    }

    @Input()
    get required(): boolean {
        return this._required;
    }

    set required(value: boolean) {

        if (typeof value === 'string') {
            console.log('value ', typeof value);
            this._required = true;
        } else {
            this._required = value;
        }
    }

    @Input()
    get value(): string {
        return this.elementRef.nativeElement.value;
    }

    set value(value: string) {
        if (value !== this.value) {
            this.elementRef.nativeElement.value = value;
            this.stateChange.next();
        }
    }

    @Input()
    get empty(): boolean {
        return !this.elementRef.nativeElement.value;
    }


    get isTextArea(): boolean {
        return this.elementRef.nativeElement.nodeName.toLowerCase() === 'textarea';
    }

    _onFocus(states: boolean) {
        this.focused = states;
        this.stateChange.next();
    }

}
