const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      Customer = require('../models/customer');

class CustomersRepository {

    // get all the customers
    getCustomers(callback) {
        console.log('*** CustomersRepository.getCustomers');
        Customer.count((err, custsCount) => {
            var count = custsCount;
            console.log(`Customers count: ${count}`);

            Customer.find({}, (err, customers) => {
                if (err) { 
                    console.log(`*** CustomersRepository.getCustomers error: ${err}`); 
                    return callback(err); 
                }
                callback(null, {
                    count: count,
                    customers: customers
                });
            });

        });
    }

    getPagedCustomers(skip, top, callback) {
        console.log('*** CustomersRepository.getPagedCustomers');
        Customer.count((err, custsCount) => {
            var count = custsCount;
            console.log(`Skip: ${skip} Top: ${top}`);
            console.log(`Customers count: ${count}`);

            Customer.find({})
                    .sort({lastName: 1})
                    .skip(skip)
                    .limit(top)
                    .exec((err, customers) => {
                        if (err) { 
                            console.log(`*** CustomersRepository.getPagedCustomers error: ${err}`); 
                            return callback(err); 
                        }
                        callback(null, {
                            count: count,
                            customers: customers
                        });
                    });

        });
    }

    // get the customer summary
    getCustomersSummary(skip, top, callback) {
        console.log('*** CustomersRepository.getCustomersSummary');
        Customer.count((err, custsCount) => {
            var count = custsCount;
            console.log(`Customers count: ${count}`);

            Customer.find({}, { '_id': 0, 'firstName': 1, 'lastName': 1, 'city': 1, 'state': 1, 'orderCount': 1, 'gender': 1 })
                    .skip(skip)
                    .limit(top)
                    .exec((err, customersSummary) => {
                        callback(null, {
                            count: count,
                            customersSummary: customersSummary
                        });
                    });

        });
    }

    // get a  customer
    getCustomer(id, callback) {
        console.log('*** CustomersRepository.getCustomer');
        Customer.findById(id, (err, customer) => {
            if (err) { 
                console.log(`*** CustomersRepository.getCustomer error: ${err}`); 
                return callback(err); 
            }
            callback(null, customer);
        });
    }

    // insert a  customer
    insertCustomer(body, state, callback) {
        console.log('*** CustomersRepository.insertCustomer');
        console.log(state);
        var customer = new Customer();
        var newState = { 'id': state[0].id, 'abbreviation': state[0].abbreviation, 'name': state[0].name }
        console.log(body);

        customer.firstName = body.firstName;
        customer.lastName = body.lastName;
        customer.email = body.email;
        customer.address = body.address;
        customer.city = body.city;
        customer.state = newState;
        customer.stateId = newState.id;
        customer.zip = body.zip;
        customer.gender = body.gender;

        customer.save((err, customer) => {
            if (err) { 
                console.log(`*** CustomersRepository insertCustomer error: ${err}`); 
                return callback(err, null); 
            }

            callback(null, customer);
        });
    }

    updateCustomer(id, body, state, callback) {
        console.log('*** CustomersRepository.editCustomer');

        var state = { 'id': state[0].id, 'abbreviation': state[0].abbreviation, 'name': state[0].name }

        Customer.findById(id, (err, customer)  => {
            if (err) { 
                console.log(`*** CustomersRepository.editCustomer error: ${err}`); 
                return callback(err); 
            }

            customer.firstName = body.firstName || customer.firstName;
            customer.lastName = body.lastName || customer.lastName;
            customer.email = body.email || customer.email;
            customer.address = body.address || customer.address;
            customer.city = body.city || customer.city;
            customer.state = state;
            customer.stateId = state.id;
            customer.zip = body.zip || customer.zip;
            customer.gender = body.gender || customer.gender;


            customer.save((err, customer) => {
                if (err) { 
                    console.log(`*** CustomersRepository.updateCustomer error: ${err}`); 
                    return callback(err, null); 
                }

                callback(null, customer);
            });

        });
    }

    // delete a customer
    deleteCustomer(id, callback) {
        console.log('*** CustomersRepository.deleteCustomer');
        Customer.remove({ '_id': id }, (err, customer) => {
            if (err) { 
                console.log(`*** CustomersRepository.deleteCustomer error: ${err}`); 
                return callback(err, null); 
            }
            callback(null, customer);
        });
    }

}

module.exports = new CustomersRepository();