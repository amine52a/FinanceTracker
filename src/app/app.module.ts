import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  // 👈 Required for ngModel
import { HttpClientModule } from '@angular/common/http'; // 👈 Add this

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { TransferCardsComponent } from './components/transfer-cards/transfer-cards.component';
import { PromoCardComponent } from './components/promo-card/promo-card.component';
import { CompanyFormComponent } from './pages/company-form/company-form.component';
import { CompaniesListComponent } from './pages/companies-list/companies-list.component';
import { WorkersListComponent } from './pages/workers-list/workers-list.component';
import { FinanceFormComponent } from './pages/finance-form/finance-form.component';
import { CompanyDetailsComponent } from './pages/company-details/company-details.component';
import { RouterModule } from '@angular/router';
import { UserProjectChartComponent } from './components/user-project-chart/user-project-chart.component';
import { PredictComponent } from './pages/predict/predict.component';
@NgModule({
  declarations: [AppComponent,  ],  // REMOVE LoginComponent here
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule  ,
    HttpClientModule,
RouterModule,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
