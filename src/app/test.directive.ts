import {Directive, Input} from '@angular/core';

@Directive({
    selector: 'test'
})
export class TestDirective {

    _id;

    constructor() {
    }

    @Input()
    get id() {
        return this._id;
    }

    set id(val) {
        console.log(val)
        this._id = val;
    }

}
