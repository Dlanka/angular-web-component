import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {NgUiElementsModule} from 'ng-ui-elements';
import { CalanderComponent } from './calander/calander.component';
import {CalenderModule} from './calender/calender.module';
import { TestDirective } from './test.directive';
import { HierarchyComponent } from './hierarchy/hierarchy.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
    declarations: [
        AppComponent,
        CalanderComponent,
        TestDirective,
        HierarchyComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        NgUiElementsModule,
        CalenderModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
