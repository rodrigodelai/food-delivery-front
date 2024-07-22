import { trigger, state, style, transition, animate } from "@angular/animations";

export const toggleLineAnimation = trigger('toggleLine', [
    state('one-line', style({ height: '1.25em' })),
    state('standard', style({ height: '*' })),
    state('two-lines', style({ height: '2.5em' })),
    transition('one-line <=> standard', [ animate('300ms 100ms ease-in-out') ]),
    transition('standard <=> two-lines', [ animate('300ms 100ms ease-in-out') ]),
    transition('two-lines <=> one-line', [ animate('300ms 100ms ease-in-out') ])
]);
