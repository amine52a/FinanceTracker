// src/app/services/predict.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PredictService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  getRevenuePrediction(companyId: string): Observable<{ companyId: string; pastRevenue: number[]; prediction: number[] }> {
    return this.http.post<{ companyId: string; pastRevenue: number[]; prediction: number[] }>(
      `${this.apiUrl}/predict/${companyId}`,
      {}
    );
  }

  getCompanies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/companies`);
  }
}
