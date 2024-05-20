import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-card-item',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.css'
})
export class CardItemComponent {

  log(msg: string, event: Event) {
    console.log(msg);
    event.stopPropagation();
  }
}
