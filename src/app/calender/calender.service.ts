import {Injectable} from '@angular/core';
import {CalenderModule} from './calender.module';

@Injectable({
    providedIn: 'root'
})
export class CalenderService {

    constructor() {
    }

    addCalenderYear(currentDate: Date, count: number): Date {
        return new Date(currentDate.setFullYear((currentDate.getFullYear() - currentDate.getFullYear() % 24) + (count)));
    }

}
