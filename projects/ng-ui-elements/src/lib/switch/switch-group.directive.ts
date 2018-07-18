import {
    AfterContentInit, ChangeDetectionStrategy,
    ContentChildren,
    Directive,
    EventEmitter,
    forwardRef, Injector,
    Input,
    OnInit,
    Output,
    QueryList,
} from '@angular/core';
import {SwitchComponent} from './switch.component';
import {ControlValueAccessor, FormControlName, NG_VALUE_ACCESSOR, NgControl} from '@angular/forms';

let nextGroupId = 0;

export class SwitchGroupChange {
    constructor(public source: SwitchComponent,
                public value: any) {
    }
}

@Directive({
    selector: 'ng-switch-group',
    exportAs: 'ngSwitchGroup',
    host: {
        'class': 'ng-switch-group',
        '[class.ng-switch-group-disabled]': 'disabledControl',
    },
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: SwitchGroupDirective, multi: true}
    ]
})

export class SwitchGroupDirective implements ControlValueAccessor, OnInit, AfterContentInit {

    private _id = `ng_switch_group_${++nextGroupId}`;
    private _name = `${this.id}_name`;
    private _value: any;
    private _selected: SwitchComponent | null = null;
    private _disabled: boolean;
    private _on = 'Yes';
    private _off = 'No';

    @Input()
    get on() {
        return this._on;
    }

    set on(val: string) {
        this._on = val;
        this._updateLabel('ON');
    }

    @Input()
    get off() {
        return this._off;
    }

    set off(val: string) {
        this._off = val;
        this._updateLabel('OFF');
    }

    @Input() offLabel = 'No';

    @Output() change: EventEmitter<SwitchGroupChange> = new EventEmitter<SwitchGroupChange>();

    @ContentChildren(forwardRef(() => SwitchComponent), {descendants: true})
    switches: QueryList<SwitchComponent>;

    _onValueChange(value: any) {
    }

    _onTouch() {
    }

    constructor() {
    }

    ngOnInit(): void {
    }

    ngAfterContentInit(): void {
        if (this.switches) {
            this._updateSwitchInputType();
            this._updateFromValueStatus();
            this._allSwitchDisabled();
        }
    }

    @Input()
    get id() {
        return this._id;
    }

    set id(val: string) {
        this._id = val;
    }

    @Input()
    get name() {
        return this._name;
    }

    set name(val: string) {
        this._name = val;
        this._updateSwitchName();
    }

    @Input()
    get value() {
        return this._value;
    }

    set value(val: any) {
        this._value = !this.disabledControl ? val : null;
    }

    @Input()
    get selected() {
        return this._selected;
    }

    set selected(selected: SwitchComponent) {
        if (!this.disabledControl) {
            this._selected = selected;
        } else {
            selected = null;
            this._selected = null;
        }
        this.value = selected ? selected.value : null;
    }

    @Input()
    get disabledControl() {
        return this._disabled;
    }

    set disabledControl(condition: boolean) {
        this._disabled = condition;
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

    setDisabledState(isDisabled: boolean) {
        this.disabledControl = isDisabled;
    }

    _emitSwitch() {
        this.change.emit(new SwitchGroupChange(this.selected, this.value));
    }


    private _updateSwitchInputType() {
        setTimeout(() => {
            this.switches.forEach(_switch => {
                _switch.type = 'radio';
            });
        }, 1);
    }


    private _updateSwitchName() {
        setTimeout(() => {
            this.switches.forEach((_switch) => {
                _switch.name = this.name;
            });
        }, 1);
    }

    private _updateFromValueStatus() {
        setTimeout(() => {
            if (!this.disabledControl) {
                this.switches.forEach((_switch) => {
                    if (_switch.value === this.value) {
                        this.selected = _switch;
                        _switch.checked = true;
                    }
                });
            }
        }, 1);
    }

    private _allSwitchDisabled() {
        setTimeout(() => {
            if (this.disabledControl) {
                this.switches.forEach((_switch) => {
                    _switch.disabled = true;
                });
            }
        }, 1);
    }

    private _updateLabel(val: string) {
        console.log('label ', val);
        setTimeout(() => {
            if (this.switches) {
                this.switches.forEach((_switch) => {
                    if (val === 'ON') {
                        _switch.onLabel = this._on;
                    } else {
                        _switch.offLabel = this._off;
                    }
                });
            }
        }, 1);
    }
}
