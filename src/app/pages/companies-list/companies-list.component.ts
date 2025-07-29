// src/app/pages/companies-list/companies-list.component.ts
import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Router } from '@angular/router';
import { InitialsPipe } from '../../shared/pipes/initials.pipe';

@Component({
  selector: 'app-companies-list',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    MatTableModule,
    RouterModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    InitialsPipe
  ],
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.css'],
})
export class CompaniesListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'image',
    'name',
    'field',  // Make sure this matches your template
    'numberOfWorkers',
    'createdAt',
    'actions',
  ];

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatSort) sort!: MatSort;

  backendUrl = 'http://localhost:5000/uploads/';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchCompanies();
  }

  fetchCompanies(): void {
    this.http.get<any>('http://localhost:5000/api/companies').subscribe({
      next: (res) => {
        this.dataSource.data = res.data;
      },
      error: (err) => console.error('❌ Failed to fetch companies:', err),
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  getCompanyImageUrl(imageName: string | undefined): string {
    if (imageName) {
      return this.backendUrl + imageName;
    }
    return 'https://via.placeholder.com/40';
  }

  goToCompanyDetails(companyId: string): void {
    this.router.navigate(['/companies/details', companyId]);
  }

  onDelete(id: string): void {
    if (confirm('Are you sure you want to delete this company?')) {
      this.http.delete(`http://localhost:5000/api/companies/${id}`).subscribe({
        next: () => {
          this.dataSource.data = this.dataSource.data.filter(c => c._id !== id);
          console.log(`✅ Deleted company with ID: ${id}`);
        },
        error: (err) => {
          console.error('❌ Delete failed:', err);
          alert('Failed to delete company.');
        },
      });
    }
  }
}