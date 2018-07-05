import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {from, Observable, Subject} from 'rxjs/index';
import {groupBy, map, mergeMap, toArray} from 'rxjs/internal/operators';

@Component({
    selector: 'app-calander',
    templateUrl: './calander.component.html',
    styleUrls: ['./calander.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CalanderComponent implements OnInit {

    stateChange = new Subject<string>();
    currentSelectYear = new Date().getFullYear();
    currentSelectMonth = new Date().getMonth();
    showYear: boolean;
    years = [];
    dates = [];
    yearsInChunk = [];
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Agu', 'Sep', 'Oct', 'Nov', 'Dec'];
    days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'St'];

    constructor() {
    }

    ngOnInit() {
        this.init();
    }


    init() {
        this.years = this.getYears('', '');
        const selectMonth = new Date(this.currentSelectYear).getMonth();
        this.onSelectMonth(this.currentSelectMonth);

        this.yearsInChunk = this.chunkTo(this.years, 4);
    }

    getYears(startYear, endYear) {
        const years = [];
        endYear = endYear || new Date().getFullYear();
        startYear = startYear || 1990;

        while (startYear <= endYear) {
            years.push(startYear++);
        }
        return years;
    }

    getDates(year, month) {
        const date = new Date(year, month, 1);
        const firstDay = date.getDay();
        const days = [];

        while (date.getMonth() === month) {
            const week = Math.ceil((date.getDate() + firstDay) / 7);
            days.push(
                {
                    'week': week - 1,
                    'day': date.getDay(),
                    'date': [date.getDate(), new Date(date)]
                }
            );
            date.setDate(date.getDate() + 1);
        }
        return days;
    }

    splitToRow(dates) {
        const result = [];
        from(dates).pipe(
            groupBy(d => d['week']),
            mergeMap(group => {
                return group.pipe(toArray());
            })
        ).subscribe(das => {
            result.push(das.map(o => o['date']));
        });
        return result;
    }

    chunkTo(array, groupsize) {
        let sets = [];
        let chunks;
        let i = 0;

        chunks = array.length / groupsize;

        while (i < chunks) {
            sets[i] = array.splice(0, groupsize);
            i++;
        }

        return sets;
    }

    //
    onSelectYear(year) {
        this.currentSelectYear = year;
    }

    onSelectMonth(month) {
        this.currentSelectMonth = +this.months[month];
        this.dates = this.splitToRow(this.getDates(this.currentSelectYear, month));
    }

    onLoadYears(year) {
        this.showYear = !this.showYear;
    }

}
