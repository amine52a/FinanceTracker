import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

export interface Worker {
  _id: string;
  name: string;
  companyId: {
    _id: string;
    name: string;
  };
  position: string;
  salary: number;
  hireDate?: string;
  email?: string;
}

@Component({
  selector: 'app-workers-list',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './workers-list.component.html',
  styleUrls: ['./workers-list.component.css'],
})
export class WorkersListComponent implements OnInit, AfterViewInit {
  toggleSearch = false;

  displayedColumns: string[] = ['name', 'company', 'position', 'salary', 'hireDate', 'email', 'actions'];
  dataSource = new MatTableDataSource<Worker>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  pageSize = 10;
  pageIndex = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadWorkers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
    this.dataSource.sortingDataAccessor = (item, property) => {
      if (property === 'company') {
        return item.companyId?.name || '';
      }
return (item as any)[property];
    };

    this.dataSource.filterPredicate = (data, filter) =>
      data.name.toLowerCase().includes(filter) ||
      (data.companyId?.name.toLowerCase().includes(filter)) ||
      data.position.toLowerCase().includes(filter) ||
      (data.email ?? '').toLowerCase().includes(filter);
  }

  loadWorkers(): void {
    this.http.get<any>('http://localhost:5000/api/workers').subscribe({
      next: (res) => {
        console.log('✅ Fetched workers:', res);
        this.dataSource.data = res.data;
      },
      error: (err) => {
        console.error('❌ Failed to fetch workers:', err);
      },
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.pageIndex = 0;
    if (this.paginator) this.paginator.firstPage();
  }

  changePageSize(size: number): void {
    this.pageSize = size;
    this.pageIndex = 0;
    this.paginator.pageSize = size;
    this.paginator.firstPage();
  }

  get pageCount(): number {
    return Math.ceil(this.dataSource.filteredData.length / this.pageSize);
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.pageCount) {
      this.pageIndex = page;
      this.paginator.pageIndex = page;
      this.paginator._changePageSize(this.pageSize);
    }
  }

  previousPage(): void {
    if (this.pageIndex > 0) this.goToPage(this.pageIndex - 1);
  }

  nextPage(): void {
    if (this.pageIndex < this.pageCount - 1) this.goToPage(this.pageIndex + 1);
  }
}