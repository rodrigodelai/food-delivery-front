import { trigger, state, style, transition, animate } from "@angular/animations";

export const pumpAnimation = trigger('pump', [
    state('increase', style({ transform: 'scale(1.6)' })),
    state('decrease', style({ })),
    transition('increase <=> decrease', [ animate('300ms ease-in-out') ])
]);