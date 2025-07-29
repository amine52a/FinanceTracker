import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule, SidebarComponent]
})
export class CompanyFormComponent implements OnInit {
  @Input() companyData: any = null;
  @Output() formSubmitted = new EventEmitter<any>();
  @Output() formCancelled = new EventEmitter<void>();

  companyForm!: FormGroup;
  isEditMode = false;
  selectedFile: File | null = null;
  imagePreviews: string[] = [];

  categories = ['Finance', 'Marketing', 'IT'];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.initializeForm();

    if (this.companyData) {
      this.isEditMode = true;
      this.companyForm.patchValue(this.companyData);
      if (this.companyData.images && this.companyData.images.length > 0) {
        this.imagePreviews = this.companyData.images.map((img: string) => `/uploads/${img}`);
      }
    }
  }

  initializeForm(): void {
    this.companyForm = this.fb.group({
      _id: [''],
      name: ['', Validators.required],
      email: ['', [Validators.email]],
      phone: [''],
      address: [''],
      numberOfWorkers: [null, [Validators.min(1)]],
      field: [''],
      creationDate: [''],
      description: [''],
      hrEmail: ['', [Validators.email]],
      hrPhone: ['']
    });
  }

  selectCategory(category: string) {
    this.companyForm.patchValue({ field: category });
  }

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    this.selectedFile = input.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        this.imagePreviews = [reader.result.toString()];
      }
    };
    reader.readAsDataURL(this.selectedFile);
  }

  removeImage() {
    this.selectedFile = null;
    this.imagePreviews = [];
  }

  onSubmit() {
    if (this.companyForm.valid) {
      if (this.isEditMode) {
        this.updateCompany();
      } else {
        this.createCompany();
      }
    } else {
      this.markFormGroupTouched(this.companyForm);
      alert('Please fill all required fields correctly.');
    }
  }

  createCompany() {
    const formValues = this.companyForm.value;
    const formData = new FormData();

    for (const key in formValues) {
      if (formValues[key] && key !== '_id') {
        formData.append(key, formValues[key]);
      }
    }

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.http.post("http://localhost:5000/api/companies", formData)
      .subscribe({
        next: (response) => {
          alert('Company created successfully!');
          this.formSubmitted.emit(response);
          this.resetForm();
        },
        error: (err) => {
          console.error('❌ Error creating company:', err);
          alert('Error creating company. Please try again.');
        }
      });
  }

  updateCompany() {
    const formValues = this.companyForm.value;
    const id = formValues._id;
    const formData = new FormData();

    for (const key in formValues) {
      if (formValues[key] && key !== '_id') {
        formData.append(key, formValues[key]);
      }
    }

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.http.put(`http://localhost:5000/api/companies/${id}`, formData)
      .subscribe({
        next: (response) => {
          alert('Company updated successfully!');
          this.formSubmitted.emit(response);
          this.resetForm();
        },
        error: (err) => {
          console.error('Error updating company:', err);
          alert('Error updating company. Please try again.');
        }
      });
  }

  onDelete() {
    if (confirm('Are you sure you want to delete this company?')) {
      const id = this.companyForm.get('_id')?.value;
      this.http.delete(`http://localhost:5000/api/companies/${id}`)
        .subscribe({
          next: () => {
            alert('Company deleted successfully!');
            this.formSubmitted.emit({ deleted: true });
            this.resetForm();
          },
          error: (err) => {
            console.error('Error deleting company:', err);
            alert('Error deleting company. Please try again.');
          }
        });
    }
  }

  onCancel() {
    this.resetForm();
    this.formCancelled.emit();
  }

  private resetForm() {
    this.companyForm.reset();
    this.imagePreviews = [];
    this.selectedFile = null;
    this.isEditMode = false;
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
