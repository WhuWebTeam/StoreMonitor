module.exports = app => {
    class Cashiers extends app.Service {
        
        // constructor of class Cashiers
        constructor() {
            
            // default value of table cashiers
            this.table = {
                id: '00000000',
                name: ''
            };
        }


        // judge cashier exists or not
        async exists(id) {
            if (await this.service.dbHelp.count('cashiers', 'id', { id })) {
                return true;
            } else {
                return false;
            }
        }

        
        // insert record to cashiers
        async insert(cashier) {

            cashier = this.service.util.setTableValue(this.table, cashier);

            // cashier exists
            if (await this.exists(cashier.id)) {
                return false;
            }

            // add a new cashier
            await this.service.dbHelp.insert('cashiers', cashier);
            return true;
        }


        // query cashiers with condition query or not
        async query(cashier) {

            cashier = this.service.util.setTableValue(this.table, cashier);
            
            // cashier doesn't exists
            if (cashier.id && !await this.exists(cashier.id)) {
                return this.service.util.generateResponse(400, `cashier doesn't exists`);
            }

            // get info of cashier specified by cashier id
            if (cashier.id) {
                cashier = await this.service.dbHelp.query('cashiers', ['*'], { id: cashier.id });
                return {
                    code: 200,
                    data: cashier && cashier[0]
                };

                return;
            }

            // get info of cashiers secified by other attributes
            const cashiers = await this.service.dbHelp.query('cashiers', ['*'], cashier);
            return {
                code: 200,
                data: cashiers
            };
        }

    }

    return Cashiers;
}