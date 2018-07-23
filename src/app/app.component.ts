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
  isEnabled = true;

  vehicles = [
    {text: 'Car', val: 'car'},
    {text: 'Bike', val: 'bike'},
    {text: 'Van', val: 'van'}
  ];

  testForm: FormGroup;

  ngOnInit() {

    this.testForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl('', [Validators.required]),
      check_me: new FormControl(false),
      check_me2: new FormControl(true),
      // 'vechicel': new FormControl('car'),
      vechicel2: new FormControl(this.vehicles[2].val),
      switch1: new FormControl(true),
      switch2: new FormControl(true),
      sw_vehicle: new FormControl('van'),
      select: new FormControl('', [Validators.required]),
      uploadf: new FormControl('')
    });
  }

  get select() {
    return this.testForm.get('select');
  }

  get uploadf() {
    return this.testForm.get('uploadf');
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
    this.isEnabled = !this.isEnabled;
    console.log(this.testForm.value);
    // this.testForm.reset({'check_me': true});
  }

  _onRadioChage(e) {
    console.log(e);
  }

  onClick() {
    alert('s');
  }

  _onSwitch(e) {
    console.log(e);
  }

  _swirchGroupChange(e) {
    console.log(e);
  }
}
