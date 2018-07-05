import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-child',
    templateUrl: './child.component.html',
    styleUrls: ['./child.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent implements OnInit {
    @Input() date;
    @Input() text;

    constructor() {
    }

    ngOnInit() {
    }


}
