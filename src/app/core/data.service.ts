import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

//Grab everything with import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/catch';

import { ICustomer, IOrder, IState, IPagedResults } from '../shared/interfaces';

@Injectable()
export class DataService {
  
    //Call Node.js 'microservice'
    baseUrl: string = 'http://localhost:3000/api/customers';
    //Call ASP.NET Core 'microservice'
    statesUrl: string = 'http://localhost:5000/api/states';

    constructor(private http: Http) { 

    }
    
    getCustomers() : Observable<ICustomer[]> {
        return this.http.get(this.baseUrl)
                   .map((res: Response) => {
                       let customers = res.json();
                       this.calculateCustomersOrderTotal(customers);
                       return customers;
                   })
                   .catch(this.handleError);
    }

    getCustomersPage(page: number, pageSize: number) : Observable<IPagedResults<ICustomer[]>> {
        return this.http.get(`${this.baseUrl}/page/${page}/${pageSize}`)
                    .map((res: Response) => {
                        let response = res.json();
                        let customers = response.results;
                        this.calculateCustomersOrderTotal(customers);
                        return {
                            results: customers,
                            totalRecords: response.totalRecords
                        };
                    })
                    .catch(this.handleError);
    }
    
    getCustomer(id: string) : Observable<ICustomer> {
        return this.http.get(this.baseUrl + '/' + id)
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
    }

    insertCustomer(customer: ICustomer) : Observable<ICustomer> {
        return this.http.post(this.baseUrl, customer)
                   .map((res: Response) => {
                       const data = res.json();
                       console.log('insertCustomer status: ' + data.status);
                       return data.customer;
                   })
                   .catch(this.handleError);
    }
   
    updateCustomer(customer: ICustomer) : Observable<ICustomer> {
        return this.http.put(this.baseUrl + '/' + customer._id, customer) 
                   .map((res: Response) => {
                       const data = res.json();
                       console.log('updateCustomer status: ' + data.status);
                       return data.customer;
                   })
                   .catch(this.handleError);
    }

    deleteCustomer(id: string) : Observable<boolean> {
        return this.http.delete(this.baseUrl + '/' + id)
                   .map((res: Response) => res.json().status)
                   .catch(this.handleError);
    }

    //Not used but could be called to pass "options" (3rd parameter) to 
    //appropriate POST/PUT/DELETE calls made with http
    getRequestOptions() {
        const csrfToken = ''; //would retrieve from cookie or from page
        const options = new RequestOptions({
            headers: new Headers({ 'x-xsrf-token': csrfToken })
        });
        return options;
    }
    
    getStates(): Observable<IState[]> {
        return this.http.get(this.statesUrl)
                   .map((res: Response) => res.json())
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
    
    private handleError(error: any) {
        console.error('server error:', error); 
        if (error instanceof Response) {
          let errMessage = '';
          try {
            errMessage = error.json().error;
          } catch(err) {
            errMessage = error.statusText;
          }
          return Observable.throw(errMessage);
          // Use the following instead if using lite-server
          //return Observable.throw(err.text() || 'backend server error');
        }
        return Observable.throw(error || 'Node.js server error');
    }

}
