import {Component, OnInit, Input, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'button[ng-button]',
    exportAs: 'ngButton',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        'class': 'ng-button',
        '[class.ng-button-disabled]': 'disabled',
        '[disabled]': 'disabled || null',
    },
    inputs: ['disabled', 'color']
})
export class ButtonComponent implements OnInit {
    color: string;
    disabled: boolean;

    constructor() {
    }

    ngOnInit() {
        console.log('color ', this.color);
    }


}


@Component({
    selector: 'a[ng-button]',
    exportAs: 'ngButton, ngAnchor',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        'class': 'ng-button',
        '[class.ng-button-disabled]': 'disabled',
        '[attr.tabindex]': 'disabled ? -1 : 0',
        '[attr.disabled]': 'disabled || null',
        '[attr.aria-disabled]': 'disabled',
        '(click)': '_eventDisabled($event)',
    },
    inputs: ['disabled', 'color']
})

export class AnchorButtonComponent extends ButtonComponent {
    constructor() {
        super();
    }

    _eventDisabled(e: Event) {
        if (this.disabled) {
            console.log(this.disabled, typeof this.disabled);
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }
    }
}