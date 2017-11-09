module.exports = app => {
    class CustomerSalesInfo extends app.Service {
        
        // judge castomerSalesInfo exists or not
        async exists(customerId, transId, ts) {
            if (await this.service.dbHelp.count('CustomerSalesInfo', 'id', { customerId, transId, ts })) {
                return true;
            } else {
                return false;
            }
        }

        // insert customerSalesInfo queried from bills to CustomerSalesInfos
        async insert(customerSalesInfo) {

        }
    }

    return CustomerSalesInfo;
}