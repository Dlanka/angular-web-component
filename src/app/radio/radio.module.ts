import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RadioComponent} from './radio.component';
import {RadioGroupDirective} from './radio-group.directive';


@NgModule({
    exports: [RadioGroupDirective, RadioComponent],
    imports: [CommonModule],
    declarations: [RadioGroupDirective, RadioComponent],
})
export class RadioModule {
}
