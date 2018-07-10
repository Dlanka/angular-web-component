import {NgModule} from '@angular/core';

import {NgUiElementsComponent} from './ng-ui-elements.component';
import {NgInputModule} from './input/ng-input.module';
import {FormFieldModule} from './form-field/form-field.module';
import {CalendarModule} from './calendar/calendar.module';
import {NgErrorModule} from './error/error.module';
import {CheckboxModule} from './checkbox/checkbox.module';
import {RadioModule} from './radio/radio.module';


@NgModule({
    imports: [
        NgInputModule
    ],
    declarations: [
        NgUiElementsComponent,
    ],
    exports: [
        NgUiElementsComponent,
        NgInputModule,
        FormFieldModule,
        NgErrorModule,
        CheckboxModule,
        RadioModule,
        CalendarModule,
    ]
})
export class NgUiElementsModule {
}
