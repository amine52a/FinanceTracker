import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() userName: string = 'Alex';
  @Input() userImage: string = 'https://i.pravatar.cc/100?img=8';
  @Input() hasNotifications: boolean = false; // Properly declared input property
  @Output() search = new EventEmitter<string>();
  
  searchQuery: string = ''; // Added for ngModel binding

  onSearch(event: any) {
    this.search.emit(event.target.value);
  }
}