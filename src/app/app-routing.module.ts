import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneralSearchDialogComponent } from './dialogs/general-search-dialog/general-search-dialog.component';

const routes: Routes = [
    {path : 'dialogs', component: GeneralSearchDialogComponent},
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})
export class AppRoutingModule { }
