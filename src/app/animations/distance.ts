import { trigger, state, style, transition, animate } from "@angular/animations";

export const distanceAnimation = trigger('distance', [
    state('increase', style({ marginBottom: '.25em' })),
    state('decrease', style({ marginBottom: 0 })),
    transition('increase <=> decrease', [ animate('300ms ease-in-out') ])
]);
