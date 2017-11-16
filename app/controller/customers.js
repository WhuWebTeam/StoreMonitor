module.exports = app => {
    class Customer extends app.Controller {
        
        // index test
        async index() {
            this.ctx.body = {
                code: 200,
                data: {
                    info: 'test successed'
                }
            };
        }


        // get customers' info
        async getCustomers() {
            this.ctx.body = await this.service.customers.query({});
        }


        // get some customers info  specified by id or name
        async getCustomer() {
            const customer = this.ctx.request.body;

            this.ctx.body = await this.service.customers.query(customer);
        }


        // add a new customer info
        async addCustomer() {
            const customer = this.ctx.request.body;

            // customer exists
            if (!await this.service.customers.insert(customer)) {
                this.ctx.body = this.service.util.generateResponse(400, 'customer exists');
                return;
            }

            this.ctx.body = this.service.util.generateResponse(200, 'add customer record successed');
        }
    }

    return Customer;
}