import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CalenderComponent} from './calender.component';
import {CalenderHeaderComponent} from './calender-header/calender-header.component';
import { CalenderBodyComponent } from './calender-body/calender-body.component';
import { MonthViewComponent } from './calender-body/month-view/month-view.component';
import { YearViewComponent } from './calender-body/year-view/year-view.component';
import { DateViewComponent } from './calender-body/date-view/date-view.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        CalenderComponent,
        CalenderHeaderComponent,
        CalenderBodyComponent,
        MonthViewComponent,
        YearViewComponent,
        DateViewComponent,
    ],
    exports: [CalenderComponent]
})
export class CalenderModule {
}
