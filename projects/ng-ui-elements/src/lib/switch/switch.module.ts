import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SwitchComponent} from './switch.component';
import {SwitchGroupDirective} from './switch-group.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [SwitchComponent, SwitchGroupDirective],
    exports: [SwitchComponent, SwitchGroupDirective]
})
export class SwitchModule {
}
