import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NgUiElementsModule} from 'ng-ui-elements';
import { CalanderComponent } from './calander/calander.component';
import {CalenderModule} from './calender/calender.module';
import {TestModule} from './test/test.module';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations: [
        AppComponent,
        CalanderComponent
    ],
    imports: [
        BrowserModule,
        NgUiElementsModule,
        CalenderModule,
        TestModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
