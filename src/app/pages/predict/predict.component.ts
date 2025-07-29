import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PredictService } from '../../services/predict.service';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";

interface Company {
  _id: string;
  name: string;
  // add other fields if needed
}

interface CompaniesResponse {
  companies: Company[];
  data?: Company[]; // Optional data property
}

interface PredictionResponse {
  companyId: string;
  pastRevenue: number[];
  prediction: number[];
}

@Component({
  standalone: true,
  selector: 'app-predict',
  templateUrl: './predict.component.html',
  styleUrls: ['./predict.component.css'],
  imports: [CommonModule, SidebarComponent],
})
export class PredictComponent implements OnInit {
  @ViewChild('revenueChart', { static: false }) chartRef!: ElementRef;
  private chart: Chart | null = null;
  
  // Component state
  companies: Company[] = [];
  selectedCompanyId: string | null = null;
  companyName: string = '';
  predictions: number[] = [];
  pastRevenue: number[] = [];
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(private predictService: PredictService) {}

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.predictService.getCompanies().subscribe({
      next: (response: CompaniesResponse | Company[]) => {
        if (Array.isArray(response)) {
          this.companies = response;
        } else if (response.data && Array.isArray(response.data)) {
          this.companies = response.data;
        } else if (response.companies && Array.isArray(response.companies)) {
          this.companies = response.companies;
        } else {
          console.error('Unexpected format for companies data:', response);
          this.errorMessage = 'Unexpected data format received';
          this.companies = [];
        }
        this.isLoading = false;
      },
      error: (err: Error) => {
        console.error('Error loading companies:', err);
        this.errorMessage = 'Failed to load companies. Please try again later.';
        this.isLoading = false;
      },
    });
  }

  selectCompany(company: Company): void {
    this.selectedCompanyId = company._id;
    this.companyName = company.name;
    this.isLoading = true;
    this.errorMessage = null;

    if (!this.selectedCompanyId) {
      console.error('Selected company ID is null or undefined');
      this.errorMessage = 'Invalid company selection';
      this.isLoading = false;
      return;
    }

    this.predictService.getRevenuePrediction(this.selectedCompanyId).subscribe({
      next: (res: PredictionResponse) => {
        this.predictions = res.prediction;
        this.pastRevenue = res.pastRevenue;
        this.createChart();
        this.isLoading = false;
      },
      error: (err: Error) => {
        console.error('Prediction error:', err);
        this.errorMessage = 'Failed to get revenue prediction';
        this.isLoading = false;
      },
    });
  }

  private createChart(): void {
    // Destroy previous chart if exists
    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = this.chartRef?.nativeElement.getContext('2d');
    if (!ctx) return;

    // Generate labels for past and future months
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = new Date().getMonth();
    const pastLabels = [];
    const futureLabels = [];
    
    for (let i = 5; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      pastLabels.push(months[monthIndex]);
    }
    
    for (let i = 1; i <= 6; i++) {
      const monthIndex = (currentMonth + i) % 12;
      futureLabels.push(months[monthIndex]);
    }

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [...pastLabels, ...futureLabels],
        datasets: [
          {
            label: 'Past Revenue',
            data: [...this.pastRevenue, ...Array(6).fill(null)],
            borderColor: '#3498db',
            backgroundColor: 'rgba(52, 152, 219, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.3
          },
          {
            label: 'Predicted Revenue',
            data: [...Array(6).fill(null), ...this.predictions],
            borderColor: '#2ecc71',
            backgroundColor: 'rgba(46, 204, 113, 0.1)',
            borderWidth: 3,
            borderDash: [5, 5],
            fill: true,
            tension: 0.3
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Revenue Trend and Prediction',
            font: {
              size: 16
            }
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const value = context.raw as number;
                return `${context.dataset.label}: $${value?.toLocaleString() ?? 'N/A'}`;
              }
            }
          },
          legend: {
            position: 'bottom'
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            ticks: {
              callback: (value) => {
                if (typeof value === 'number') {
                  return `$${value.toLocaleString()}`;
                }
                return value;
              }
            },
            title: {
              display: true,
              text: 'Revenue ($)'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Months'
            }
          }
        }
      }
    });
  }

  ngOnDestroy(): void {
    // Clean up chart instance when component is destroyed
    if (this.chart) {
      this.chart.destroy();
    }
  }
}