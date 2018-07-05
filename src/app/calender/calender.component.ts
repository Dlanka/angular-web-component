import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CalenderService} from './calender.service';

@Component({
    selector: 'app-calender',
    templateUrl: './calender.component.html',
    styleUrls: ['./calender.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CalenderComponent implements OnInit {

    currentDate: Date = new Date();
    viewType = 'month';

    constructor(private calender: CalenderService) {
    }

    ngOnInit() {
    }

    onViewEvent(view) {
        this.viewType = view;
    }

    onDateChange(date: Date) {
        //console.log('Date ', date);
        this.currentDate = date;
        // this.dataArr.push('Kasun');
    }
}
