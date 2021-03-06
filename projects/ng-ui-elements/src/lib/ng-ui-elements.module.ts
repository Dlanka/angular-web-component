import {NgModule} from '@angular/core';

import {NgUiElementsComponent} from './ng-ui-elements.component';
import {NgInputModule} from './input/ng-input.module';
import {FormFieldModule} from './form-field/form-field.module';
import {NgErrorModule} from './error/error.module';
import {CheckboxModule} from './checkbox/checkbox.module';
import {RadioModule} from './radio/radio.module';
import {SwitchModule} from './switch/switch.module';
import {ButtonModule} from './button/button.module';
import {SelectModule} from './select/select.module';
import { UploadModule } from './upload/upload.module';


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
        SwitchModule,
        ButtonModule,
        SelectModule,
        UploadModule
    ]
})
export class NgUiElementsModule {
}
