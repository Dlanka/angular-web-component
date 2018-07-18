import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AnchorButtonComponent, ButtonComponent} from './button.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [ButtonComponent, AnchorButtonComponent],
    exports: [ButtonComponent, AnchorButtonComponent]
})
export class ButtonModule {
}
