import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service'; // Adjust path if needed

@Component({
  selector: 'app-companies-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './companies-edit.component.html',
  styleUrls: ['./companies-edit.component.css'],
})
export class CompaniesEditComponent implements OnInit {
  form!: FormGroup;
  companyId!: string;

  currentImage: string | null = null;
  imageBasePath = 'http://localhost:5000/uploads/'; // Adjust if needed
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.companyId = this.route.snapshot.paramMap.get('id')!;

    this.form = this.fb.group({
      name: ['', Validators.required],
      field: ['', Validators.required],
      numberOfWorkers: [0, Validators.required],
      email: [''],
      phone: [''],
      address: [''],
      creationDate: [''],
      description: [''],
      hrEmail: [''],
      hrPhone: [''],
    });

    this.loadCompany();
  }

  loadCompany(): void {
    this.http.get<any>(`http://localhost:5000/api/companies/${this.companyId}`).subscribe({
      next: (res) => {
        if (res.data.creationDate) {
          const date = new Date(res.data.creationDate);
          res.data.creationDate = date.toISOString().substring(0, 10);
        }
        this.form.patchValue(res.data);

        if (res.data.images && res.data.images.length > 0) {
          this.currentImage = this.imageBasePath + res.data.images[0];
        }
      },
      error: (err) => console.error('❌ Failed to load company:', err),
    });
  }

 onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (!input.files?.length) {
    return;
  }
  const file = input.files[0];
  console.log('Selected file:', file);
  // Store the file or process it
  this.selectedFile = file;
}

onSubmit(): void {
  if (!this.form.valid) {
    alert('Please fill all required fields.');
    return;
  }

  const formData = new FormData();

  // Append form fields (all as strings)
  Object.entries(this.form.value).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      formData.append(key, value.toString());
    } else {
      formData.append(key, '');
    }
  });

  // Append image file if selected
  if (this.selectedFile) {
    formData.append('image', this.selectedFile);
  }

  const token = this.authService.getToken();
  console.log('Token:', token);  // <--- Add this line here

  const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;

  this.http.put(`http://localhost:5000/api/companies/${this.companyId}`, formData, { headers }).subscribe({
    next: () => {
      alert('✅ Company updated successfully!');
      this.router.navigate(['/companies']);
    },
    error: (err) => {
      console.error('❌ Failed to update:', err);
      alert(`❌ Update failed: ${err.status} ${err.statusText}`);
    },
  });
}


  onCancel(): void {
    this.router.navigate(['/companies']);
  }
}
