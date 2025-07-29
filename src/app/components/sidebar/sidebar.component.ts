import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
logout() {
throw new Error('Method not implemented.');
}
  @Input() isSidebarCollapsed: boolean = false;
  @Output() isSidebarCollapsedChange = new EventEmitter<boolean>();

items = [
  { routeLink: '/home', icon: 'fas fa-chart-line', label: 'Dashboard' },
  { routeLink: '/companies', icon: 'fas fa-building', label: 'Companies' },
  { routeLink: '/finances', icon: 'fas fa-wallet', label: 'Finance' },
  { routeLink: '/workers', icon: 'fas fa-users', label: 'Workers' },
  { routeLink: '/chat', icon: 'fas fa-robot', label: 'AI Consultant' },
  { routeLink: '/settings', icon: 'fas fa-cog', label: 'Settings' }, // Optional, add if you have it
  { routeLink: '/login', icon: 'fas fa-sign-out-alt', label: 'Logout' },
];

router: any;

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    this.isSidebarCollapsedChange.emit(this.isSidebarCollapsed);
  }

  isActive(route: string): boolean {
    return false; // You can later improve this with Router
  }
}
