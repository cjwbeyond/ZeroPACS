import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {AdvancedSortableDirective} from "./directives/advanced-sortable.directive";



@NgModule({
  declarations: [AdvancedSortableDirective],
  exports: [
    AdvancedSortableDirective
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
})
export class SharedModule { }
