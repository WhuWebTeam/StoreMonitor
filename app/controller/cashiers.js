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
            const cashiers = await this.service.dbHelp.query('cashiers', ['*'], {});

            this.ctx.body = {
                code: 200,
                data: cashiers
            };
        }

        // get info of cashier specified by id or name
        async getCashier() {
            let cashier = this.ctx.request.body;
            
            // cashier doesn't exists
            if (cashier.id && !await this.service.cashiers.exists(cashier.id)) {
                this.ctx.body = this.service.util.generateResponse(400, `cashier doesn't exists`);
                return;
            }

            // get info of cashier specified by cashier id
            if (cashier.id) {
                cashier = await this.service.dbHelp.query('cashiers', ['*'], { id: cashier.id });
                this.ctx.body = {
                    code: 200,
                    data: cashier[0]
                };

                return;
            }

            // get info of cashiers secified by other attributes
            cashier = await this.service.dbHelp.query('cashiers', ['*'], cashier);
            this.ctx.body = {
                code: 200,
                data: cashier
            };
        }

        // add a new cashier
        async addCashier() {
            const cashier = this.ctx.request.body;

            // cashier exists
            if (await this.service.cashiers.exists(cashier.id)) {
                this.ctx.body = this.service.util.generateResponse(400, 'cashier exists');
                return;
            }

            // add a new cashier;
            await this.service.dbHelp.insert('cashiers', cashier);
            this.ctx.body = this.service.generateResponse(200, ``)
        }
    }

    return Cashiers;
}