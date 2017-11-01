import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DataService } from '../core/data.service';
import { ICustomer, IState } from '../shared/interfaces';
import { ValidationService } from '../shared/validation.service';

@Component({
  selector: 'customer-edit',
  templateUrl: 'customer-edit.component.html'
})
export class CustomerEditComponent implements OnInit {

  customerForm: FormGroup;
  customer: ICustomer = {
    firstName: '',
    lastName: '',
    gender: '',
    address: '',
    email: '',
    city: '',
    zip: 0,
    state: { id: '0', abbreviation: '', name: ''}
  };
  states: IState[];
  errorMessage: string;
  deleteMessageEnabled: boolean;
  operationText: string = 'Insert';
  
  constructor(private router: Router, 
              private route: ActivatedRoute, 
              private dataService: DataService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    if (id !== '0') {
      this.operationText = 'Update';
      this.getCustomer(id);
    }

    this.getStates();
    this.buildForm();
  }

  getCustomer(id: string) {
      this.dataService.getCustomer(id)
        .subscribe((customer: ICustomer) => {
          //Quick and dirty clone used in case user cancels out of form
          const cust = JSON.stringify(customer);
          this.customer = JSON.parse(cust);
          this.buildForm();
        },
        (err) => console.log(err));
  }

  buildForm() {
      this.customerForm = this.formBuilder.group({
        firstName:  [this.customer.firstName, Validators.required],
        lastName:   [this.customer.lastName, Validators.required],
        gender:     [this.customer.gender, Validators.required],
        email:      [this.customer.email, [Validators.required, ValidationService.emailValidator]],
        address:    [this.customer.address, Validators.required],
        city:       [this.customer.city, Validators.required],
        stateId:    [this.customer.state.id, Validators.required]
      });
  }

  getStates() {
    this.dataService.getStates().subscribe((states: IState[]) => this.states = states);
  }
  
  submit({ value, valid }: { value: ICustomer, valid: boolean }) {
      
      value.id = this.customer.id;
      value.zip = this.customer.zip || 0; 
      // var customer: ICustomer = {
      //   id: this.customer.id,
      // };

      if (value.id) {

        this.dataService.updateCustomer(value)
          .subscribe((customer: ICustomer) => {
            if (customer) {
              this.router.navigate(['/customers']);
            }
            else {
              this.errorMessage = 'Unable to save customer';
            }
          },
          (err) => console.log(err));

      } else {

        this.dataService.insertCustomer(value)
          .subscribe((customer: ICustomer) => {
            if (customer) {
              this.router.navigate(['/customers']);
            }
            else {
              this.errorMessage = 'Unable to add customer';
            }
          },
          (err) => console.log(err));
          
      }
  }
  
  cancel(event: Event) {
    event.preventDefault();
    this.router.navigate(['/customers']);
  }

  delete(event: Event) {
    event.preventDefault();
    this.dataService.deleteCustomer(this.customer.id)
        .subscribe((status: boolean) => {
          if (status) {
            this.router.navigate(['/customers']);
          }
          else {
            this.errorMessage = 'Unable to delete customer';
          }
        },
        (err) => console.log(err));
  }

}