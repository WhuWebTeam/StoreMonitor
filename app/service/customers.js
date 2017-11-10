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


        // query customers with condition query or not
        async query(customer) {
            
            // customer doesn't exists
            if (customer.id && !await this.exists(customer.id)) {
                return this.service.util.generateResponse(400, `customer doesn't exists`);
            }
                 
            // get info of customer specified by id
            if (customer.id) {
                customer = await this.service.dbHelp.query('customers', ['*'], { id: customer.id });
                return {
                    code: 200,
                    data: customer && customer[0]
                };
            }
            
            // get info of customer specified by other attributes
            const customers = await this.service.dbHelp.query('customers', ['*'], customer);
            return {
                code: 200,
                data: customers
            }
        }
    }

    return Customers;
}