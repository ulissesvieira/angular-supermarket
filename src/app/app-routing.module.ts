import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneralSearchDialogComponent } from './dialogs/general-search-dialog/general-search-dialog.component';

import { HomeComponent } from './authentication/home/home.component';
import { LoginComponent } from './authentication/login/login.component';

const routes: Routes = [
    {path: 'dialogs', component: GeneralSearchDialogComponent},
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent}
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})
export class AppRoutingModule { }
