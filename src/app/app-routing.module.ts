import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMainViewComponent } from './pages/admin-main-view/admin-main-view.component';
import { UserStepperMainComponent } from './pages/user-stepper-main/user-stepper-main.component';
import { UserLandingPageComponent } from './pages/user-landing-page/user-landing-page.component';
import { AdminMainPanelComponent } from './pages/admin-main-panel/admin-main-panel.component';


const routes: Routes = [
  { path: 'admin', component: AdminMainViewComponent },
  { path: 'user', component: UserLandingPageComponent },
  { path: 'stepper', component: UserStepperMainComponent},
  { path: 'admin-panel', component: AdminMainPanelComponent },
  { path: '', redirectTo: 'user', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
