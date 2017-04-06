"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
//Grab everything with import 'rxjs/Rx';
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/throw");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var DataService = (function () {
    function DataService(http) {
        this.http = http;
        this.baseUrl = '/api/customers';
    }
    DataService.prototype.getCustomers = function () {
        var _this = this;
        return this.http.get(this.baseUrl)
            .map(function (res) {
            var customers = res.json();
            _this.calculateCustomersOrderTotal(customers);
            return customers;
        })
            .catch(this.handleError);
    };
    DataService.prototype.getCustomersPage = function (page, pageSize) {
        var _this = this;
        return this.http.get(this.baseUrl + "/page/" + page + "/" + pageSize)
            .map(function (res) {
            var totalRecords = +res.headers.get('x-inlinecount');
            var customers = res.json();
            _this.calculateCustomersOrderTotal(customers);
            return {
                results: customers,
                totalRecords: totalRecords
            };
        })
            .catch(this.handleError);
    };
    DataService.prototype.getCustomer = function (id) {
        return this.http.get(this.baseUrl + '/' + id)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    DataService.prototype.insertCustomer = function (customer) {
        return this.http.post(this.baseUrl, customer)
            .map(function (res) {
            var data = res.json();
            console.log('insertCustomer status: ' + data.status);
            return data.customer;
        })
            .catch(this.handleError);
    };
    DataService.prototype.updateCustomer = function (customer) {
        return this.http.put(this.baseUrl + '/' + customer._id, customer)
            .map(function (res) {
            var data = res.json();
            console.log('updateCustomer status: ' + data.status);
            return data.customer;
        })
            .catch(this.handleError);
    };
    DataService.prototype.deleteCustomer = function (id) {
        return this.http.delete(this.baseUrl + '/' + id)
            .map(function (res) { return res.json().status; })
            .catch(this.handleError);
    };
    //Not used but could be called to pass "options" (3rd parameter) to 
    //appropriate POST/PUT/DELETE calls made with http
    DataService.prototype.getRequestOptions = function () {
        var csrfToken = ''; //would retrieve from cookie or from page
        var options = new http_1.RequestOptions({
            headers: new http_1.Headers({ 'x-xsrf-token': csrfToken })
        });
        return options;
    };
    DataService.prototype.getStates = function () {
        return this.http.get('/api/states')
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    DataService.prototype.calculateCustomersOrderTotal = function (customers) {
        for (var _i = 0, customers_1 = customers; _i < customers_1.length; _i++) {
            var customer = customers_1[_i];
            if (customer && customer.orders) {
                var total = 0;
                for (var _a = 0, _b = customer.orders; _a < _b.length; _a++) {
                    var order = _b[_a];
                    total += (order.price * order.quantity);
                }
                customer.orderTotal = total;
            }
        }
    };
    DataService.prototype.handleError = function (error) {
        console.error('server error:', error);
        if (error instanceof http_1.Response) {
            var errMessage = '';
            try {
                errMessage = error.json().error;
            }
            catch (err) {
                errMessage = error.statusText;
            }
            return Observable_1.Observable.throw(errMessage);
            // Use the following instead if using lite-server
            //return Observable.throw(err.text() || 'backend server error');
        }
        return Observable_1.Observable.throw(error || 'Node.js server error');
    };
    return DataService;
}());
DataService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], DataService);
exports.DataService = DataService;
//# sourceMappingURL=data.service.js.map