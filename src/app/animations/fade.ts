import { trigger, state, style, transition, animate } from "@angular/animations";

export const fadeAnimation = trigger('fade', [
    state('show', style({ opacity: 1 })),
    state('hide', style({ opacity: 0 })),
    transition('show <=> hide', [ animate('300ms ease-in-out') ])
]);
