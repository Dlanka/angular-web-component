import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NgUiElementsModule} from 'ng-ui-elements';
import { CalanderComponent } from './calander/calander.component';
import {CalenderModule} from './calender/calender.module';
import {TestModule} from './test/test.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CheckbxComponent } from './checkbx/checkbx.component';
import { SwitchComponent } from './switch/switch.component';


@NgModule({
    declarations: [
        AppComponent,
        CalanderComponent,
        CheckbxComponent,
        SwitchComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
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
