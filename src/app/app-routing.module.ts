import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomersComponent } from './customers/customers.component';
import { CustomerEditComponent } from './customers/customer-edit.component';
import { CustomersGridComponent } from './customers/customers-grid.component';

import { SharedModule } from 'app/shared/shared.module';

const routes: Routes = [
  { path: 'customers', component: CustomersComponent},
  { path: 'customers/:id', component: CustomerEditComponent },
  { path: '**', pathMatch:'full', redirectTo: '/customers' } //catch any unfound routes and redirect to home page
];

@NgModule({
  imports: [ SharedModule, RouterModule.forRoot(routes) ],
  exports: [ RouterModule, CustomersGridComponent, CustomersComponent, CustomerEditComponent ],
  declarations: [ CustomersGridComponent, CustomersComponent, CustomerEditComponent ]
})
export class AppRoutingModule {

}
