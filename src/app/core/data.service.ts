import { Injectable } from '@angular/core';

import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/catch';

import { ICustomer, IOrder, IState, 
         IPagedResults, ICustomerResponse } from '../shared/interfaces';

@Injectable()
export class DataService {
  
    //Call ASP.NET Core 'microservice'
    baseUrl: string = 'http://localhost:5000/api/customers';
    //Call Node.js 'microservice'
    statesUrl: string = 'http://localhost:3000/api/states';

    constructor(private http: HttpClient) { }
    
    getCustomers() : Observable<ICustomer[]> {
        return this.http.get<ICustomer[]>(this.baseUrl)
                   .map((customers: ICustomer[]) => {
                       this.calculateCustomersOrderTotal(customers);
                       return customers;
                   })
                   .catch(this.handleError);
    }

    getCustomersPage(page: number, pageSize: number) : Observable<IPagedResults<ICustomer[]>> {
        return this.http.get<ICustomer[]>(
                `${this.baseUrl}/page/${page}/${pageSize}`, 
                {observe: 'response'})
                   .map(res => {
                        //Need to observe response in order to get to this header (see {observe: 'response'} above)
                        const totalRecords = +res.headers.get('X-InlineCount');
                        let customers = res.body as ICustomer[];
                        this.calculateCustomersOrderTotal(customers);
                        return {
                            results: customers,
                            totalRecords: totalRecords
                        };
                    })
                    .catch(this.handleError);
    }
    
    getCustomer(id: string) : Observable<ICustomer> {
        return this.http.get<ICustomer>(this.baseUrl + '/' + id)
                   .catch(this.handleError);
    }

    insertCustomer(customer: ICustomer) : Observable<ICustomer> {
        return this.http.post<ICustomerResponse>(this.baseUrl, customer)
                   .map((data) => {
                       console.log('insertCustomer status: ' + data.status);
                       return data.customer;
                   })
                   .catch(this.handleError);
    }
   
    updateCustomer(customer: ICustomer) : Observable<ICustomer> {
        return this.http.put<ICustomerResponse>(this.baseUrl + '/' + customer.id, customer) 
                   .map((data) => {
                       console.log('updateCustomer status: ' + data.status);
                       return data.customer;
                   })
                   .catch(this.handleError);
    }

    deleteCustomer(id: string) : Observable<boolean> {
        return this.http.delete<boolean>(this.baseUrl + '/' + id)
                   .catch(this.handleError);
    }
   
    getStates(): Observable<IState[]> {
        return this.http.get<IState[]>(this.statesUrl)
                   .catch(this.handleError);
    }

    calculateCustomersOrderTotal(customers: ICustomer[]) {
        for (let customer of customers) {
            if (customer && customer.orders) {
                let total = 0;
                for (let order of customer.orders) {
                    total += (order.price * order.quantity);
                }
                customer.orderTotal = total;
            }
        }
    }
    
    private handleError(error: HttpErrorResponse) {
        console.error('server error:', error); 
        if (error.error instanceof Error) {
          let errMessage = error.error.message;
          return Observable.throw(errMessage);
          // Use the following instead if using lite-server
          //return Observable.throw(err.text() || 'backend server error');
        }
        return Observable.throw(error || 'Server error');
    }

}
