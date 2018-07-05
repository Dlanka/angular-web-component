import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TestComponent} from './test.component';
import {ChildComponent} from './child/child.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [TestComponent, ChildComponent],
    exports:[TestComponent]
})
export class TestModule {
}
