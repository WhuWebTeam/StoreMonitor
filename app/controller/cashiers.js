module.exports = app => {
    class Cashiers extends app.Controller {

        // index test
        async index() {
            this.ctx.body = {
                code: 200,
                data: {
                    info: 'test successed'
                }
            };
        }


        // get cashiers info
        async getCashiers() {
            this.ctx.body = await this.service.cashiers.query({});
        }


        // get info of cashier specified by id or name
        async getCashier() {
            let cashier = this.ctx.request.body;
            
            this.ctx.body = await this.service.cashiers.query(cashier);
        }

        
        // add a new cashier
        async addCashier() {
            const cashier = this.ctx.request.body;

            // cashier exists
            if (!await this.service.cashiers.insert(cashier)) {
                this.ctx.body = this.service.util.generateResponse(400, `cashier exists`);
                return;
            }

            this.ctx.body = this.service.util.generateResponse(200, 'add cashier record successed');
        }
    }

    return Cashiers;
}