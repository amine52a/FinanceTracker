import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-finance-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './finance-form.component.html',
  styleUrls: ['./finance-form.component.css'],
})
export class FinanceFormComponent implements OnInit {
  @Input() financeData: any = null;
  @Output() formSubmitted = new EventEmitter<any>();
  @Output() formCancelled = new EventEmitter<void>();

  financeForm!: FormGroup;
  companies: any[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.financeForm = this.fb.group({
      _id: [''],
      companyId: ['', Validators.required],
      type: ['', Validators.required],  // 'income' or 'expense'
      amount: [null, [Validators.required, Validators.min(0.01)]],
      date: [new Date().toISOString().substring(0, 10), Validators.required],
      description: [''],
    });

    if (this.financeData) {
      this.financeForm.patchValue(this.financeData);
      // Format date if needed
      if (this.financeData.date) {
        this.financeForm.patchValue({ date: this.financeData.date.substring(0, 10) });
      }
    }

    this.loadCompanies();
  }

loadCompanies() {
  this.http.get<any>('http://localhost:5000/api/companies').subscribe({
    next: (res) => {
      // Assuming your API returns { data: [...] }
      this.companies = Array.isArray(res) ? res : res.data;
    },
    error: (err) => {
      console.error('Error loading companies:', err);
    },
  });
}


  onSubmit() {
    if (!this.financeForm.valid) {
      this.markFormGroupTouched(this.financeForm);
      alert('Please fill all required fields correctly.');
      return;
    }

    const formValue = { ...this.financeForm.value };
    if (!formValue._id) {
      delete formValue._id;
    }

    if (formValue._id) {
      // Update
      this.http.put(`http://localhost:5000/api/finances/${formValue._id}`, formValue).subscribe({
        next: (res) => {
          alert('Finance record updated successfully!');
          this.formSubmitted.emit(res);
          this.financeForm.reset();
        },
        error: (err) => {
          console.error('Error updating finance:', err);
          alert('Error updating finance record. Please try again.');
        },
      });
    } else {
      // Create
      this.http.post('http://localhost:5000/api/finances', formValue).subscribe({
        next: (res) => {
          alert('Finance record created successfully!');
          this.formSubmitted.emit(res);
          this.financeForm.reset();
        },
        error: (err) => {
          console.error('Error creating finance:', err);
          alert('Error creating finance record. Please try again.');
        },
      });
    }
  }

  onCancel() {
    this.financeForm.reset();
    this.formCancelled.emit();
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => control.markAsTouched());
  }
}
