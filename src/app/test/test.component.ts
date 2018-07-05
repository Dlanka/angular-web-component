import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

    constructor() {
    }

    data = [new Date().getTime()];
    text = '';
    count = 0;

    ngOnInit() {
    }

    onDateAdd() {
        // const d = this.data.slice(0);
        this.data.push(new Date().getTime());
        //this.data = d;
        this.text = ''+this.count++;
    }

}
