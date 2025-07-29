import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-worker-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './worker-form.component.html',
  styleUrls: ['./worker-form.component.css'],
})
export class WorkerFormComponent implements OnInit {
  @Input() workerData: any = null;
  @Output() formSubmitted = new EventEmitter<any>();
  @Output() formCancelled = new EventEmitter<void>();

  workerForm!: FormGroup;
  companies: any[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.workerForm = this.fb.group({
      _id: [''],
      name: ['', Validators.required],
      email: ['', [Validators.email]],
      position: [''],
      salary: [null],
      hireDate: [''],
      companyId: ['', Validators.required],
    });

    if (this.workerData) {
      this.workerForm.patchValue(this.workerData);
    }

    // Fetch companies for dropdown
    this.http.get<any>('http://localhost:5000/api/companies').subscribe({
      next: (res) => {
        this.companies = res.data; // Assuming your API returns { data: [...] }
      },
      error: (err) => {
        console.error('Error loading companies:', err);
      },
    });
  }

  onSubmit() {
    if (!this.workerForm.valid) {
      this.markFormGroupTouched(this.workerForm);
      alert('Please fill all required fields correctly.');
      return;
    }

    // Get form values and remove _id if empty or falsy
    const formValue = { ...this.workerForm.value };
    if (!formValue._id) {
      delete formValue._id;
    }

    console.log('Sending worker data:', formValue);

    if (formValue._id) {
      // Update existing worker
      this.http.put(`http://localhost:5000/api/workers/${formValue._id}`, formValue).subscribe({
        next: (response) => {
          alert('Worker updated successfully!');
          this.formSubmitted.emit(response);
          this.workerForm.reset();
        },
        error: (err) => {
          console.error('Error updating worker:', err);
          alert('Error updating worker. Please try again.');
        },
      });
    } else {
      // Create new worker
      this.http.post('http://localhost:5000/api/workers', formValue).subscribe({
        next: (response) => {
          alert('Worker created successfully!');
          this.formSubmitted.emit(response);
          this.workerForm.reset();
        },
        error: (err) => {
          console.error('Error creating worker:', err);
          alert('Error creating worker. Please try again.');
        },
      });
    }
  }

  onCancel() {
    this.workerForm.reset();
    this.formCancelled.emit();
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => control.markAsTouched());
  }
}
