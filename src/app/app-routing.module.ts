import { authGuard } from './services/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { UsersComponent } from './components/users/users.component';
import { AmostrasComponent } from './components/amostras/amostras.component';
import { AddamostraComponent } from './components/addamostra/addamostra.component';
import { EditamostraComponent } from './components/editamostra/editamostra.component';
import { ViewamostraComponent } from './components/viewamostra/viewamostra.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:'login',
    pathMatch:'full'
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'register',
    component: RegisterComponent
  },
  {
    path: 'homepage',
    component: HomepageComponent,
    canActivate: [authGuard]
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [authGuard]
  },
  {
    path: 'amostras',
    component: AmostrasComponent,
    canActivate: [authGuard]
  },
  {
    path: 'addamostra',
    component: AddamostraComponent,
    canActivate: [authGuard],
    data: { requiredRole: 'ADMIN' }
  },
  {
    path: 'editamostra/:id',
    component: EditamostraComponent,
    canActivate: [authGuard],
    data: { requiredRole: 'ADMIN' }
  },
  {
    path: 'viewamostra/:id',
    component: ViewamostraComponent,
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
