import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { TransferCardsComponent } from "../../components/transfer-cards/transfer-cards.component";
import { PromoCardComponent } from "../../components/promo-card/promo-card.component";
import { UserProjectChartComponent } from '../../components/user-project-chart/user-project-chart.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SidebarComponent,
    HeaderComponent,
    TransferCardsComponent,
    PromoCardComponent,
    UserProjectChartComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  sidebarCollapsed = false;

  userName = 'Alex'; // Replace with dynamic data from service

  userCount: number = 0;    // Add this
  projectCount: number = 0; // Add this

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadStats();
  }

  onSearch(searchTerm: string) {
    console.log('Searching for:', searchTerm);
    // Implement your search functionality here
  }

  loadStats() {
    this.http.get<{ total: number }>('http://localhost:5000/api/stats/users/count').subscribe({
      next: (data) => this.userCount = data.total,
      error: (err) => console.error('Error loading user count:', err)
    });

    this.http.get<{ total: number }>('http://localhost:5000/api/stats/projects/count').subscribe({
      next: (data) => this.projectCount = data.total,
      error: (err) => console.error('Error loading project count:', err)
    });
  }
}
