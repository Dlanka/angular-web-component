import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
  Input,
  ContentChild
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Type} from '@angular/compiler/src/core';

let nextUpload = 0;
const bytes = 1024 * 1024;

@Component({
  selector: 'ng-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[attr.id]': 'id',
    '[class.ng-upload-required]': 'required'
  },
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: UploadComponent, multi: true}
  ]
})
export class UploadComponent implements OnInit, ControlValueAccessor {
  @ViewChild('file') _inputFile: ElementRef;

  uploaId = nextUpload;

  private _id = `ng_upload_${this.uploaId}`;
  private _name = `ng_upload_${this.uploaId}_name`;
  private _value: any;
  private _target: any;
  private _required: boolean;
  private _buttonText = 'Upload';
  // 2MB
  public _maxSize = 2 * bytes;
  public errorMessage: string;
  public uploadFiles: any[];
  private _showLabel = true;
  private _showItem = true;

  private _maxSizeMsg =
    'Max file size is ' + (this.maxSize / 1024 / 1014).toFixed(0) + ' MB';

  _onValueChange(val: any) {}
  _onTouch() {}

  @Input()
  get id() {
    return this._id;
  }
  set id(val: string) {
    this._id = val;
  }

  @Input()
  get showLabel() {
    return this._showLabel;
  }
  set showLabel(val: boolean) {
    this._showLabel = val;
  }

  @Input()
  get buttonText() {
    return this._buttonText;
  }
  set buttonText(val: string) {
    this._buttonText = val;
  }

  @Input()
  get showItem() {
    return this._showItem;
  }
  set showItem(val: boolean) {
    this._showItem = val;
  }

  @Input()
  get name() {
    return this._name;
  }
  set name(val: string) {
    this._name = val;
  }

  @Input()
  get maxSize() {
    return this._maxSize;
  }
  set maxSize(val: number) {
    this._maxSize = val * bytes;
  }

  @Input()
  get value() {
    return this._value;
  }
  set value(val: any) {
    this._value = val;
  }

  @Input()
  get required() {
    return this._required;
  }
  set required(val: boolean) {
    this._required = val;
  }

  constructor() {}

  ngOnInit() {}

  _onClick() {
    this._inputFile.nativeElement.click();
  }

  _fileUploadChange(e: Event) {
    this._target = e.target;

    if (this.isMaxFile()) {
      this.errorMessage = this._maxSizeMsg;
      this.uploadFiles = [];
      this.value = null;
      this.updateValueChanges();
      return;
    }

    this.errorMessage = '';
    this.uploadFiles = [];

    for (const file of this._target.files) {
      this.uploadFiles.push(file);
    }
    this.value = this._target.files;
    this.updateValueChanges();
  }

  updateValueChanges() {
    this._onValueChange(this.value);
    this._onTouch();
  }

  isMaxFile() {
    for (const f of this._target.files) {
      return f.size > this.maxSize ? true : false;
    }
  }

  removeFile(index) {
    this.uploadFiles = [];
    this.value = null;
    this._target.files = null;
    this.updateValueChanges();
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

  setDisabledState?(isDisabled: boolean): void {}
}
