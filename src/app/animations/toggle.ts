import { trigger, state, style, transition, animate } from "@angular/animations";

export const toggleAnimation = trigger('toggle', [
    state('show', style({ height: '*', opacity: 1 })),
    state('hide', style({ height: 0, opacity: 0 })),
    transition('show <=> hide', [ animate('300ms ease-in-out') ])
]);
