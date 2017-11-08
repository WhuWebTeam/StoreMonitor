module.exports = app => {
    class Cashiers extends app.Controller {
        async index() {
            this.ctx.body = {
                code: 200,
                data: {
                    info: 'test successed'
                }
            };
        }


        async getCashiers() {
            const cashiers = await this.service.dbHelp.query('cashiers', ['*'], {});

            this.ctx.body = {
                code: 200,
                data: cashiers
            };
        }

        async getCashier() {
            let cashier = this.ctx.request.body;
            
            if (cashier.id) {
                cashier = await this.service.dbHelp.query('cashiers', ['*'], cashier);
                this.ctx.body = {
                    code: 200,
                    data: cashier[0]
                };

                return;
            }

            cashier = await this.service.dbHelp.query('cashiers', ['*'], cashier);
            this.ctx.body = {
                code: 200,
                data: cashier
            };
        }

        async addCashier() {
            const cashier = this.ctx.request.body;

            await this.service.dbHelp.insert('cashiers', cashier);
            this.ctx.body = this.service.generateResponse(200, ``)
        }
    }

    return Cashiers;
}