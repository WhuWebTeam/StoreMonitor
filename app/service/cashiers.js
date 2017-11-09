module.exports = app => {
    class Cashiers extends app.Service {
        
        // judge cashier exists or not
        async exists(id) {
            if (!await this.service.dbHelp.count('cashiers', 'id', { id })) {
                return true;
            } else {
                return false;
            }
        }

        // insert record to cashiers
        async insert(cashier) {

            // cashier exists
            if (await this.exists(cashier.id)) {
                return false;
            }

            // add a new cashier;
            await this.service.dbHelp.insert('cashiers', cashier);
            return true;
        }
    }

    return Cashiers;
}