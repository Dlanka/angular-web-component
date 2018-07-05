import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'app-calender-body',
    templateUrl: './calender-body.component.html',
    styleUrls: ['./calender-body.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CalenderBodyComponent implements OnInit {

    @Input('view') viewType: string;
    @Input('activeDate') _date: Date;

    perPage = 24;
    col = 4;
    year = [];
    yearRow = [];

    constructor() {
    }

    get date(): Date {
        return this._date;
    }

    ngOnInit() {
        //this.yearRow = this.loadYears();
    }

    loadYears() {
        const activeYear = this._date.getFullYear();
        const yearOffset = activeYear % this.perPage;
        const year = [];

        for (let x = 0, row = []; x < this.perPage; x++) {
            row.push(activeYear - yearOffset + x);
            if (row.length === this.col) {
                year.push(row);
                row = [];
            }
        }
        return year;
    }

}
