import {
    Component, ElementRef, EventEmitter, Input, OnInit, Optional, Output, ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {RadioGroupDirective, RadioChange} from './radio-group.directive';

let nextInputId = 0;

@Component({
    selector: 'app-radio',
    templateUrl: './radio.component.html',
    styleUrls: ['./radio.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        'class': 'ng-radio-button',
        '[class.ng-radio-button-checked]': 'checked',
        '[class.ng-radio-disabled]': 'false',
        '(focus)': '_nativeInput.nativeElement.focus()'
    }
})
export class RadioComponent implements OnInit {

    private _id = `radio_input_${++nextInputId}`;
    private _value: any;
    private _name: string;
    private _checked: boolean;
    private _disabled = false;
    private _required = false;

    radioGroup: RadioGroupDirective;

    @Output() readonly change: EventEmitter<RadioChange> = new EventEmitter<RadioChange>();

    constructor(@Optional() radioGroup: RadioGroupDirective) {
        this.radioGroup = radioGroup;
    }

    @ViewChild('input') _nativeInput: ElementRef;

    @Input() name: string;

    @Input()
    get id(): string {
        return this._id;
    }

    set id(val: string) {
        this._id = val;
    }

    @Input()
    get value(): string {
        return this._value;
    }

    set value(val: string) {
        this._value = val;
    }

    @Input()
    get disabled(): boolean {
        return this._disabled;
    }

    set disabled(val: boolean) {
        this._disabled = val;
    }

    @Input()
    get checked(): boolean {
        return this._checked;
    }

    set checked(val: boolean) {
        this._uncheckAllRadio();
        this._checked = val;
        this._nativeInput.nativeElement.checked = val;
    }


    @Input()
    get required(): boolean {
        return this._required;
    }

    set required(val: boolean) {
        this._required = val;
    }

    ngOnInit() {

        if (this.radioGroup) {
            this.name = this.radioGroup.name;
        }
    }

    private _uncheckAllRadio() {
        if (this.radioGroup && this.radioGroup.radioList) {
            this.radioGroup.radioList.forEach((radio) => {
                radio._checked = false;
            });
        }
    }


    _onClickInput(e) {
        e.stopPropagation();
    }

    _onInputChange(e: Event) {

        e.stopPropagation();

        const groupValueChanged = this.radioGroup && this.value !== this.radioGroup.value;
        this.checked = true;
        this._emitChanged();

        if (this.radioGroup) {
            if (groupValueChanged) {
                this.radioGroup._emitChanged();
            }
        }
    }

    private _emitChanged() {
        this.change.emit(new RadioChange(this, this.value));
    }
}
