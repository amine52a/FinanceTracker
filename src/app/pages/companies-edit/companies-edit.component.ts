import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

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
  imageBasePath = 'http://localhost:5000/uploads/'; // Adjust based on your server static path
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
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

    this.http.get<any>(`http://localhost:5000/api/companies/${this.companyId}`).subscribe({
      next: (res) => {
        if (res.data.creationDate) {
          const date = new Date(res.data.creationDate);
          res.data.creationDate = date.toISOString().substring(0, 10);
        }
        this.form.patchValue(res.data);

        if (res.data.images && res.data.images.length > 0) {
          this.currentImage = res.data.images[0];
        }
      },
      error: (err) => console.error('❌ Failed to load company:', err),
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formData = new FormData();

      // Append form fields to FormData
      Object.entries(this.form.value).forEach(([key, value]) => {
if (value instanceof File) {
  formData.append(key, value);
} else if (value !== null && value !== undefined) {
  formData.append(key, value.toString());
} else {
  formData.append(key, '');
}
      });

      // Append image file if selected
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      this.http.put(`http://localhost:5000/api/companies/${this.companyId}`, formData).subscribe({
        next: () => {
          alert('✅ Company updated successfully!');
          this.router.navigate(['/companies']);
        },
        error: (err) => {
          console.error('❌ Failed to update:', err);
          alert('❌ Update failed');
        },
      });
    }
  }

  onCancel() {
    this.router.navigate(['/companies']);
  }
}
