import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import {CoreModule} from "../core/core.module";
import {HomeModule} from "../pages/home/home.module";
import {NavbarComponent} from "./shared/navbar/navbar.component";

@NgModule({
  declarations: [HomeLayoutComponent, MainLayoutComponent, NavbarComponent],
  imports: [
    CommonModule,
    CoreModule,
    HomeModule
  ],
  exports: [HomeLayoutComponent, NavbarComponent]
})
export class LayoutModule { }
