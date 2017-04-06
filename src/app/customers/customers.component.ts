import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataFilterService } from '../core/data-filter.service';
import { DataService } from '../core/data.service';
import { ICustomer, IOrder, IPagedResults } from '../shared/interfaces';

@Component({ 
  selector: 'customers', 
  templateUrl: 'customers.component.html'
})
export class CustomersComponent implements OnInit {

  title: string;
  customers: ICustomer[] = [];
  filteredCustomers: ICustomer[] = [];

  totalRecords: number = 0;
  pageSize: number = 10;

  constructor(private router: Router, 
              private dataService: DataService,
              private dataFilter: DataFilterService) { }
  
  ngOnInit() {
    this.title = 'Customers';
    this.getCustomersPage(1);
  }

  filterChanged(filterText: string) {
    if (filterText && this.customers) {
        let props = ['firstName', 'lastName', 'address', 'city', 'state.name', 'orderTotal'];
        this.filteredCustomers = this.dataFilter.filter(this.customers, props, filterText);
    }
    else {
      this.filteredCustomers = this.customers;
    }
  }

  pageChanged(page: number) {
    this.getCustomersPage(page);
  }

  getCustomersPage(page: number) {
    this.dataService.getCustomersPage((page - 1) * this.pageSize, this.pageSize)
        .subscribe((response: IPagedResults<ICustomer[]>) => {
          this.customers = this.filteredCustomers = response.results;
          this.totalRecords = response.totalRecords;
        },
        (err: any) => console.log(err),
        () => console.log('getCustomersPage() retrieved customers'));
  }

}