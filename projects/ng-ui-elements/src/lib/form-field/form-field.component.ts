import {
    AfterContentInit, AfterViewInit, Component, ContentChild, OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {NgInputDirective} from '../input/ng-input.directive';
import {NgControl} from '@angular/forms';

@Component({
    selector: 'ng-form-field',
    templateUrl: './form-field.component.html',
    styleUrls: ['./form-field.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        'class': 'ng-form-field',
        '[class.ng-form-field-focus]': 'this._control.focused',
        '[class.ng-form-input-not-empty]': '!this._control.empty',
        '[class.ng-touched]': 'this.controlStates("touched")',
        '[class.ng-untouched]': 'this.controlStates("untouched")',
        '[class.ng-pristine]': 'this.controlStates("pristine")',
        '[class.ng-pending]': 'this.controlStates("pending")',
        '[class.ng-valid]': 'this.controlStates("valid")',
        '[class.ng-invalid]': 'this.controlStates("invalid")',
    }
})
export class FormFieldComponent implements OnInit, AfterContentInit {

    @ContentChild(NgInputDirective) _control: NgInputDirective;


    ngOnInit() {
    }

    ngAfterContentInit() {
        console.log('Control ', this._control.ngControl.control['errors']);
    }

    get label(): string {
        return this._control.label;
    }

    set label(val: string) {
        this._control.label = val;
    }

    get required(): boolean {
        return this._control.required;
    }

    set required(val: boolean) {
        this._control.required = val;
    }

    get status(): string {
        const ngControl: NgControl = this._control ? this._control.ngControl : null;
        return ngControl && ngControl['status'];
    }

    controlStates(props: string): boolean {
        const ngControl: NgControl = this._control ? this._control.ngControl : null;
        return ngControl && ngControl[props];
    }

}
