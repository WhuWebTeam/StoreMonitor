module.exports = app => {
    class CashierSalesInfo extends app.Service {

        // judge cashierSalesInfo exists or not
        async exists(cashierId, transId, ts) {
            if (await this.service.dbHelp.count('cashierSalesInfo', 'id', { cashierId, transId, ts })) {
                return true;
            } else {
                return false;
            }
        }

        // insert cashierSalesInfo queried from bills to cashierSalesInfo
        async insert() {
            
        }
    }

    return CashierSalesInfo;
}