module.exports = app => {
    class Customers extends app.Service {

        // judge customer exists or not
        async exists(id) {
            if (await this.service.dbHelp.count('customers', 'id', { id })) {
                return true;
            } else {
                return false;
            }
        }

        
        // insert customer to customers
        async insert(customer) {

            // customer exists
            if (await this.exists(customer.id)) {
                return false;
            }

            // add a new customer record
            await this.service.dbHelp.insert('customers', customer);
            return true;
        }
    }

    return Customers;
}