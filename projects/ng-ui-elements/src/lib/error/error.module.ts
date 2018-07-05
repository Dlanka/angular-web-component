import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgErrorComponent} from './error.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [NgErrorComponent],
    exports: [NgErrorComponent]
})
export class NgErrorModule {
}
