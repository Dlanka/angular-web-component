import {Component, EventEmitter, Input, OnInit, Optional, Output, ViewEncapsulation} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {SwitchGroupDirective} from './switch-group.directive';
import {concatAll} from 'rxjs/internal/operators';

let nextId = 0;

export class SwitchChange {

    constructor(public source: SwitchComponent, public value: any) {
    }
}

@Component({
    selector: 'ng-switch',
    templateUrl: './switch.component.html',
    styleUrls: ['./switch.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        'class': 'ng-switch',
        '[class.ng-switch-checked]': 'checked',
        '[class.ng-switch-disabled]': 'disabled',
    },
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: SwitchComponent, multi: true}
    ]
})
export class SwitchComponent implements OnInit, ControlValueAccessor {

    nextSwitchId = `ng-switch_${++nextId}`;

    private _id: string;
    private _type = 'checkbox';
    private _name = `${this.nextSwitchId}_name`;
    private _value: any;
    private _checked: boolean;
    private _disabled: boolean;
    private _required: boolean;

    switchGroup: SwitchGroupDirective;

    @Input() onLabel = 'On';

    @Input() offLabel = 'Off';

    @Output() readonly change: EventEmitter<SwitchChange> = new EventEmitter<SwitchChange>();

    _onChangeFn: (value: any) => void = () => {
    }
    _onTouchFn: () => void = () => {
    }

    constructor(@Optional() switchGroup: SwitchGroupDirective) {
        this.switchGroup = switchGroup;
    }

    @Input()
    get id() {
        return this._id || this.nextSwitchId;
    }

    set id(val: string) {
        this._id = val;
    }

    @Input()
    get type() {
        return this._type;
    }

    set type(val: string) {
        this._type = val;
    }

    @Input()
    get name() {
        return this._name;
    }

    set name(val: string) {
        this._name = val;
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
        if (this.switchGroup) {
            this._updateSwitchCheckedStatus();
        }
        this._checked = val;
        this._onChangeFn(val);
        this._onTouchFn();
    }

    @Input()
    get required() {
        return this._required;
    }

    set required(val: boolean) {
        this._required = val;
    }

    @Input()
    get disabled() {
        return this._disabled;
    }

    set disabled(val: boolean) {
        this._disabled = val;
    }


    ngOnInit() {
        if (this.switchGroup) {

        }
    }

    writeValue(val: any): void {
        this.checked = val;
    }

    registerOnChange(fn: any): void {
        this._onChangeFn = fn;
    }

    registerOnTouched(fn: any): void {
        this._onTouchFn = fn;
    }

    _onSwitchClick(e) {

        e.stopPropagation();

        if (this.disabled) {
            return;
        }
    }

    _onSwitchChange(e) {
        e.stopPropagation();

        if (this.disabled) {
            return;
        }

        this.checked = !this.checked;
        this.change.emit(new SwitchChange(this, this.checked));

        if (this.switchGroup && this.switchGroup.switches) {
            this.switchGroup.selected = this;
            this.switchGroup._onValueChange(this.value);
            this.switchGroup._emitSwitch();
        }
    }

    private _updateSwitchCheckedStatus() {
        this.switchGroup.switches.forEach((_switch: SwitchComponent) => {
            _switch._checked = false;
        });
    }
}
