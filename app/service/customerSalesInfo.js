module.exports = app => {
    class CustomerSalesInfo extends app.Service {
        
        // judge customerSalesInfo exists or not
        async exists(ts) {
            if (await this.service.dbHelp.count('CustomerSalesInfo', 'id', { ts })) {
                return true;
            } else {
                return false;
            }
        }


        // judge customerSalesInfo exsits or not through customerSalesInfo
        async existsId(id) {
            if (await this.service.dbHelp.count('customerSalesInfo', 'id', { id })) {
                return true;
            } else {
                return false;
            }
        }


        // insert customerSaleInfo queried from bills to CustomerSalesInfo
        async insert(customerSaleInfo) {

            // customerSalesInfo exists
            if (await this.exists(customerSaleInfo.ts)) {
                return this.service.util.generateResponse(400, `customerSaleInfo exists`);
            }

            // add a new customerSalesInfo record
            await this.service.dbHelp.insert('customerSalesInfo', customerSaleInfo);
            return this.ctx.service.util.generateResponse(200, 'customerSaleInfo add successed');
        }


        // query max ts time
        async maxTs() {
            const sqlStr = 'select max(ts) from customerSalesInfo';
            let ts = await this.app.db.query(sqlStr);

            return ts && ts[0] || 0;
        }

        // query customerSaleInfo specified by id, customerId, transId, price, quantity, amount
        async query(customerSaleInfo) {

            // customerSaleInfo doesn't exist
            if (customerSaleInfo.id && !await this.existsId(customerSaleInfo.id)) {
                return this.service.util.generateResponse(400, `customerSaleInfo doesn't exist`);
            }

            // query info of customerSaleInfo specified by id
            if (customerSaleInfo.id) {
                customerSaleInfo = await this.service.dbHelp.query('customerSalesInfo', ['*'], { id: customerSaleInfo.id });
                return {
                    code: 200,
                    data: customerSaleInfo && customerSaleInfo[0]
                };
            }

            // query info of customerSaleInfo specified by attributes without customerSaleInfo's id
            const customerSalesInfo = await this.servcie.dbHelp.query('customerSalesInfo', ['*'], customerSalesInfo);
            return {
                code: 200,
                data: customerSalesInfo
            };
        }
    }

    return CustomerSalesInfo;
}