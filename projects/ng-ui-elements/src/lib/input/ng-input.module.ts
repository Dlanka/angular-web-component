import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgInputDirective} from './ng-input.directive';


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        NgInputDirective
    ],
    exports: [
        NgInputDirective
    ]
})
export class NgInputModule {
}
