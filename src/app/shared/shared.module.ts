import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PaginationComponent } from './pagination/pagination.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { TrimPipe } from './pipes/trim.pipe';
import { FilterTextboxComponent } from './filter-textbox/filter-textbox.component';

@NgModule({
  imports: [ CommonModule, FormsModule, ReactiveFormsModule ],
  declarations: [CapitalizePipe, TrimPipe, FilterTextboxComponent, PaginationComponent ],
  exports: [ CommonModule, FormsModule, ReactiveFormsModule, CapitalizePipe, TrimPipe, FilterTextboxComponent, PaginationComponent ]
})
export class SharedModule { }
