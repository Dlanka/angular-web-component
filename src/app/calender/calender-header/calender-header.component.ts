import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import months from './../month';
import {CalenderService} from '../calender.service';

@Component({
    selector: 'app-calender-header',
    templateUrl: './calender-header.component.html',
    styleUrls: ['./calender-header.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CalenderHeaderComponent implements OnInit {

    @Output() changedDate = new EventEmitter();

    @Output() viewChange = new EventEmitter<string>();

    @Input('view') viewType: string;
    @Input('date') date: Date;

    constructor(private calender: CalenderService) {
    }

    ngOnInit() {
    }

    get year() {
        return this.date.getFullYear();
    }

    get month() {
        return months[this.date.getMonth()];
    }

    onViewChanged() {
        this.viewType = this.viewType === 'month' ? 'year' : 'month';
        this.viewChange.emit(this.viewType);
    }

    onPrevEvent() {
        this.date = this.calender.addCalenderYear(this.date, -24);
        this.changedDate.emit(this.date);
    }

    onNextEvent() {
        this.date = this.calender.addCalenderYear(this.date, 24);
        this.changedDate.emit(this.date);
    }
}

