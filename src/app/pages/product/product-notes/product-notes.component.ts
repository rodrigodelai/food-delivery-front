import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatList } from '@angular/material/list';

@Component({
  selector: 'app-product-notes',
  standalone: true,
  imports: [MatExpansionModule, MatIconModule, MatList, FormsModule],
  templateUrl: './product-notes.component.html',
  styleUrl: './product-notes.component.css'
})
export class ProductNotesComponent {
  text: string;

  constructor() {
    this.text = '';
  }
}
