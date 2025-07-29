import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType ,ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-project-chart',
  standalone: true, // 👈 Required
  imports: [CommonModule, BaseChartDirective], // 👈 Only valid with standalone: true
  templateUrl: './user-project-chart.component.html',
  styleUrls: ['./user-project-chart.component.css']
})
export class UserProjectChartComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  @Input() userCount: number = 0;
  @Input() projectCount: number = 0;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };
  public barChartLabels: string[] = ['Users', 'Projects'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartData<'bar'> = {
  labels: ['Users', 'Projects'],
  datasets: [
    { data: [0, 0], label: 'Count' }
  ]
};

  
}
