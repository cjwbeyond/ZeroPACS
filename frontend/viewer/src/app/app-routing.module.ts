import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutModule} from "./layouts/layout.module";
import {HomeLayoutComponent} from "./layouts/home-layout/home-layout.component";

const routes: Routes = [{
  path: '',
  component: HomeLayoutComponent,
  children: [
    { path: '', redirectTo: 'viewer', pathMatch: 'full' },
    {
      path: 'viewer',
      loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule),
    },
    {
      path: 'viewer/:id',
      loadChildren: () => import('./pages/study-detail/study-detail.module').then((m) => m.StudyDetailModule),
    },
  ],
},];

@NgModule({
  imports: [LayoutModule, RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
