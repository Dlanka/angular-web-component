import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation, DoCheck} from '@angular/core';

@Component({
    selector: 'app-year-view',
    templateUrl: './year-view.component.html',
    styleUrls: ['./year-view.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class YearViewComponent implements OnInit, DoCheck {

    perPage = 24;
    col = 4;
    year = [];

    @Input('selected') _selectedDate: Date;

    constructor() {
    }

    ngOnInit() {
        //this.year = this.loadYears();
        console.log('change ', this._selectedDate)
    }

    ngDoCheck() {
        console.log('change');
        //this.year = this.loadYears();
    }

    loadYears() {
        const activeYear = this._selectedDate.getFullYear();
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

    startAndEndYear() {
        const activeYear = this._selectedDate.getFullYear();
        const yearOffset = activeYear % this.perPage;
        const startYear = activeYear - yearOffset;
        return [startYear, startYear + (this.perPage - 1)];
    }
}
