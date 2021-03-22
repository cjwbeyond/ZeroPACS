import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudyListComponent } from './components/study-list/study-list.component';
import { HomeComponent } from './home/home.component';
import {SharedModule} from "../../shared/shared.module";



@NgModule({
  declarations: [StudyListComponent, HomeComponent],
  exports: [
    HomeComponent
  ],
    imports: [
        CommonModule,
        SharedModule
    ]
})
export class HomeModule { }
