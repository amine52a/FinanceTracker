import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component'; 
import { HomeComponent } from './pages/home/home.component';
import { CompanyFormComponent } from './pages/company-form/company-form.component';
import { CompaniesListComponent } from './pages/companies-list/companies-list.component';
import { AiChatComponent } from './pages/ai-chat/ai-chat.component';
import { WorkerFormComponent } from './pages/worker-form/worker-form.component';
import { WorkersListComponent } from './pages/workers-list/workers-list.component';
import { CompaniesEditComponent } from './pages/companies-edit/companies-edit.component';
import { FinanceListComponent } from './pages/finance-list/finance-list.component';
import { FinanceFormComponent } from './pages/finance-form/finance-form.component';
import { CompanyDetailsComponent } from './pages/company-details/company-details.component';
import { PredictComponent } from './pages/predict/predict.component';




const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }, 
  { path: 'chat', component: AiChatComponent }, 
      { path: 'predict', component: PredictComponent },


  { path: 'workers', component: WorkersListComponent }, 
  { path: 'workers/add', component: WorkerFormComponent }, 


    { path: 'companies', component: CompaniesListComponent }, 
    { path: 'companies/add', component: CompanyFormComponent },
    { path: 'companies/edit/:id', component: CompaniesEditComponent },
{ path: 'companies/details/:id', component: CompanyDetailsComponent },


    { path: 'finances', component: FinanceListComponent }, 
    { path: 'finances/add', component: FinanceFormComponent }, 


    { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
