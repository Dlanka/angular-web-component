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

    testForm: FormGroup;

    ngOnInit() {
        this.testForm = new FormGroup({
            'name': new FormControl('')
        });
    }

    get name() {
        return this.testForm.get('name');
    }

    onSubmit() {
        console.log(this.testForm.controls);
        this.testForm.reset();
    }
}
