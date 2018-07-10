import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
    title = 'app';
    _checkbox = true;
    checkVal = false;

    vehicles = [
        {text: 'Car', val: 'car'},
        {text: 'Bike', val: 'bike'},
        {text: 'Van', val: 'van'},
    ];

    testForm: FormGroup;

    ngOnInit() {
        this.testForm = new FormGroup({
            'name': new FormControl(''),
            'email': new FormControl('', [Validators.required, Validators.email]),
            'address': new FormControl('', [Validators.required]),
            'check_me': new FormControl(false),
            'check_me2': new FormControl(true),
            // 'vechicel': new FormControl('car'),
            'vechicel2': new FormControl(this.vehicles[2].val),
        });
    }

    get name() {
        return this.testForm.get('name');
    }

    get email() {
        return this.testForm.get('email');
    }

    get address() {
        return this.testForm.get('address');
    }

    onSubmit() {
        console.log(this.testForm.value);
        // this.testForm.reset({'check_me': true});
    }

    _onRadioChage(e) {
        console.log(e);
    }
}
