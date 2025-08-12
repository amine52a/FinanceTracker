import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { InitialsPipe } from '../../shared/pipes/initials.pipe';

import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { Chart, BarController, BarElement, LinearScale, CategoryScale, Tooltip, Legend } from 'chart.js';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";

Chart.register(BarController, BarElement, LinearScale, CategoryScale, Tooltip, Legend);

@Component({
  selector: 'app-company-details',
  standalone: true,
  imports: [
    CommonModule, 
    BaseChartDirective, 
    SidebarComponent, 
    MatIconModule, 
    MatButtonModule,
    InitialsPipe
  ],
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {
  companyId!: string;
  company: any;
  workers: any[] = [];
  finances: any[] = [];

  public barChartData: ChartData<'bar'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Income',
        data: Array(12).fill(0),
        backgroundColor: '#4CAF50'
      },
      {
        label: 'Expenses',
        data: Array(12).fill(0),
        backgroundColor: '#F44336'
      }
    ]
  };

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false
        }
      },
      y: {
        stacked: true,
        ticks: {
          callback: (value) => '$' + value
        }
      }
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 12,
          padding: 20
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
              }).format(context.parsed.y);
            }
            return label;
          }
        }
      }
    }
  };

  public barChartType: ChartType = 'bar';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.companyId = this.route.snapshot.paramMap.get('id')!;
    this.loadCompany();
    this.loadWorkers();
    this.loadFinances();
  }

  loadCompany() {
    this.http.get<any>(`http://localhost:5000/api/companies/${this.companyId}`).subscribe({
      next: (data) => {
        this.company = data.data ?? data;
      },
      error: (err) => console.error(err)
    });
  }

  loadWorkers() {
    this.http.get<any>(`http://localhost:5000/api/workers?companyId=${this.companyId}`).subscribe({
      next: (data) => {
        this.workers = data.data ?? data;
      },
      error: (err) => console.error(err)
    });
  }

  loadFinances() {
    this.http.get<any>(`http://localhost:5000/api/finances?companyId=${this.companyId}`).subscribe({
      next: (data) => {
        this.finances = data.data ?? data;
        console.log('Raw financial data:', this.finances);
        this.updateChartData();
      },
      error: (err) => console.error(err)
    });
  }

  getTotalIncome(): number {
    return this.finances
      .filter(f => f.type === 'income')
      .reduce((sum, f) => sum + (f.amount || 0), 0);
  }

  getTotalExpenses(): number {
    return this.finances
      .filter(f => f.type === 'expense')
      .reduce((sum, f) => sum + (f.amount || 0), 0);
  }

  updateChartData() {
    const monthlyData = {
      income: Array(12).fill(0),
      expense: Array(12).fill(0)
    };

    this.finances.forEach(finance => {
      const date = new Date(finance.date);
      const month = date.getMonth();
      const amount = finance.amount || 0;
      
      if (finance.type === 'income') {
        monthlyData.income[month] += amount;
      } else if (finance.type === 'expense') {
        monthlyData.expense[month] += amount;
      }
    });

    this.barChartData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Income',
          data: monthlyData.income,
          backgroundColor: '#4CAF50'
        },
        {   
          label: 'Expenses',
          data: monthlyData.expense,
          backgroundColor: '#F44336'
        }
      ]
    };
  }
}