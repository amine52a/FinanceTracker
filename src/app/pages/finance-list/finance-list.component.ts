import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-finance-list',
  standalone: true,
    imports: [CommonModule, HttpClientModule], // ✅ Add CommonModule here

  templateUrl: './finance-list.component.html',
})

export class FinanceListComponent implements OnInit {
  finances: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getFinances();
  }

  getFinances() {
    this.http.get<any[]>('http://localhost:5000/api/finances').subscribe({
      next: (data) => {
        this.finances = data;
      },
      error: (err) => {
        console.error('Error fetching finances:', err);
      }
    });
  }

  deleteFinance(id: string) {
    this.http.delete(`http://localhost:3000/api/finances/${id}`).subscribe(() => {
      this.finances = this.finances.filter(f => f._id !== id);
    });
  }
}
