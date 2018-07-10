import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Optional,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {RadioGroupDirective, RadioChange} from '../radio-group.directive';

let nextInputId = 0;

@Component({
    selector: 'ng-radio',
    templateUrl: './radio.component.html',
    styleUrls: ['./radio.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        'class': 'ng-radio-button',
        '[class.ng-radio-button-checked]': 'checked',
        '[class.ng-radio-button-disabled]': 'disabled',
        '(focus)': '_nativeInput.nativeElement.focus()'
    }
})
export class RadioComponent implements OnInit {

    private _inputId = `radio_input_${++nextInputId}`;
    private _value: any;
    private _checked: boolean;
    private _disabled = false;
    private _required = false;

    radioGroup: RadioGroupDirective;

    @Output() readonly change: EventEmitter<RadioChange> = new EventEmitter<RadioChange>();

    @ViewChild('input') _nativeInput: ElementRef;

    @Input() name: string;

    constructor(@Optional() radioGroup: RadioGroupDirective) {
        this.radioGroup = radioGroup;
    }

    ngOnInit() {
    }

    @Input()
    get inputId(): string {
        return this._inputId;
    }

    set inputId(val: string) {
        this._inputId = val;
    }

    @Input()
    get value() {
        return this._value;
    }

    set value(val: any) {
        this._value = val;
    }

    @Input()
    get checked() {
        return this._checked;
    }

    set checked(val: boolean) {

        if (val !== this.checked) {
            this.uncheckedAllRadioButtons();
            this._checked = val;
            this.radioGroup.selected = this;
        }
    }

    private uncheckedAllRadioButtons() {
        if (this.radioGroup.radios) {
            this.radioGroup.radios.forEach(radio => {
                radio._checked = false;
            });
        }
    }

    @Input()
    get disabled() {
        return this._disabled;
    }

    set disabled(val: boolean) {
        this._disabled = val;
    }

    @Input()
    get required() {
        return this._required;
    }

    set required(val: boolean) {
        this._required = val;
    }

    _onClickInput(e: Event) {
        e.stopPropagation();
    }

    _onInputChange(e: Event) {
        e.stopPropagation();

        if (this.radioGroup.disabledGroup || this.disabled) {
            return;
        }

        this.checked = true;
        this.change.emit(new RadioChange(this, this.value));

        if (this.radioGroup) {
            this.radioGroup._onChangeFn(this.value);
            this.radioGroup._emitInputChange();
        }

    }

}
