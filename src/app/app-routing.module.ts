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
    component: HomepageComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'amostras',
    component: AmostrasComponent
  },
  {
    path: 'addamostra',
    component: AddamostraComponent
  },
  {
    path: 'editamostra/:id',
    component: EditamostraComponent
  },
  {
    path: 'viewamostra/:id',
    component: ViewamostraComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
