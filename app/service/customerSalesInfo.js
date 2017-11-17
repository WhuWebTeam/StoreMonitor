module.exports = app => {
    class CustomerSalesInfo extends app.Service {
         
        // get default value of table cashierSalesInfo
        getTable() {    
            const table = {
                customerId: '',
                transId: '',
                productId: '',
                ts: '',
                price: '',
                quantity: '',
                amount: ''
            };
        }


        // judge customerSalesInfo exists or not
        async exists(ts) {

            // parameter doesn't exist
            if (!this.service.util.parameterExists(id)) {
                return false;
            }

            // parameter exists
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

            customerSaleInfo = this.service.util.setTableValue(this.getTable(), customerSaleInfo);

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

            return ts && ts[0] && ts[0].max || 0;
        }


        // query customerSaleInfo specified by id, customerId, transId, price, quantity, amount
        async query(customerSaleInfo) {

            customerSaleInfo = this.service.util.setTableValue(this.getTable(), customerSaleInfo);
            
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


        // migrate new data from bills to customerSalesInfo
        async migrate() {
            const ts = await this.maxTs();

            const str = `insert into customerSalesInfo(customerId, transId, productId, ts, price, quantity, amount)
                         select b.customerId, b.transId, b.productId, b.ts, b.price, b.quantity, b.amount from bills b
                         where ts > $1`;

            try {
                await this.app.db.query(str, [ts]);
                await this.service.logger.logDefault('running', 'migrate new data from bills to customerSalesInfo successed')
            } catch (err) {
                await this.service.logger.logDefault('error', 'migrate new data from bills to customerSalesInfo failed')
            }
        }
    }

    return CustomerSalesInfo;
}