module.exports = app => {
    class Customer extends app.Controller {
        
        // index test
        async index() {
            this.ctx.body = {
                code: 200,
                data: {
                    info: 'test index'
                }
            };
        }

        // get customers' info
        async getCustomers() {
            const customers = await this.service.dbHelp.query('customers', ['*'], {});

            this.ctx.body = {
                code: 200,
                data: customers
            };
        }

        // get some customers info  specified by id or name
        async getCustomer() {
            let customer = this.ctx.request.body;

            // customer doesn't exists
            if (customer.id && !await this.service.customers.exists(id)) {
                this.ctx.body = this.service.util.generateResponse(400, `customer doesn't exists`);
                return;
            }


            // get info of customer specified by id
            if (customer.id) {
                customer = await this.service.dbHelp.query('customers', ['*'], { id: customer.id });
                this.ctx.body = {
                    code: 200,
                    data: customer && customer[0]
                };
            }

            // get info of customer specified by other attributes
            customer = await this.service.dbHelp.query('customers', ['*'], customer);
        }

        // add a new customer info
        async addCustomer() {
            const customer = this.ctx.request.body;

            // customer exists
            if (await this.service.customers.exists(customer.id)) {
                this.ctx.body = this.service.util.generateResponse(400, `customer exists`);
                return;
            }

            // add a new customer record
            await this.service.dbHelp.insert('customers', customer);
        }
    }

    return Customer;
}