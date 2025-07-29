import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-promo-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './promo-card.component.html',
  styleUrls: ['./promo-card.component.css']
})
export class PromoCardComponent {
formatCardNumber(arg0: string) {
throw new Error('Method not implemented.');
}
  cardDetails = {
    type: 'Platinum Edge',
    number: '4832 7691 2450 8115',
    holder: 'Alexander Morgan',
    expiry: '09/27'
  };
}