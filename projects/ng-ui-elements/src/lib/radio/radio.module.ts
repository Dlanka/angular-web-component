import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RadioGroupDirective} from './radio-group.directive';
import {RadioComponent} from './radio/radio.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        RadioGroupDirective,
        RadioComponent
    ],
    exports: [
        RadioGroupDirective,
        RadioComponent
    ]
})
export class RadioModule {
}
