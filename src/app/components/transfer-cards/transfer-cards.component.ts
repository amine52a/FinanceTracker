import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transfer-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transfer-cards.component.html',
  styleUrls: ['./transfer-cards.component.css']
})
export class TransferCardsComponent implements OnInit {
  cards = [
    { icon: 'fas fa-building', title: 'Total Companies', total: 0 },
    { icon: 'fas fa-user', title: 'Total Users', total: 0 },
    { icon: 'fas fa-briefcase', title: 'Total Projects', total: 0 }
  ];

  constructor(private http: HttpClient) {}
trackByTitle(index: number, item: any): string {
  return item.title;
}

  ngOnInit(): void {
    this.loadData();
  }

loadData(): void {
  this.http.get<{ total: number }>('http://localhost:5000/api/stats/companies/count').subscribe({
    next: data => this.cards[0].total = data.total,
    error: err => console.error('Companies count error:', err)
  });

  this.http.get<{ total: number }>('http://localhost:5000/api/stats/users/count').subscribe({
    next: data => this.cards[1].total = data.total,
    error: err => console.error('Users count error:', err)
  });

  this.http.get<{ total: number }>('http://localhost:5000/api/stats/projects/count').subscribe({
    next: data => this.cards[2].total = data.total,
    error: err => console.error('Projects count error:', err)
  });
}



}
