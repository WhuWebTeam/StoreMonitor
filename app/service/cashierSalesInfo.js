module.exports = app => {
    class CashierSalesInfo extends app.Service {

        // judge cashierSalesInfo exists or not
        async exists(ts) {
            if (await this.service.dbHelp.count('cashierSalesInfo', 'id', { ts })) {
                return true;
            } else {
                return false;
            }
        }


        // judge cashierSalesInfo exists or not 
        async existsId(id) {
            if (await this.service.dbHelp.count('cashierSalesInfo', 'id', { id })) {
                return true;
            } else {
                return false;
            }
        }


        // insert cashierSalesInfo queried from bills to cashierSalesInfo
        async insert(cashierSalesInfo) {
            if (await this.exists(cashierSalesInfo.ts)) {
                return false;
            }

            await this.service.dbHelp.insert('cashierSalesInfo', cashierSaleInfo);
            return true;
        }


        // query max ts time
        async maxTs() {
            const str = 'select max(ts) from cashierSalesInfo';
            let ts = await this.app.db.query(str);

            return ts && ts[0] || 0;
        }


        // query cashierSalesInfo specified by id, cashierId, transId, ts, duration, amount
        async query(cashierSaleInfo) {
            
            // cashierSaleInfo doesn't exist
            if (cashierSaleInfo.id && !await this.existsId(cashierSaleInfo.id)) {
                return this.service.util.generateResponse(400, `cashierSaleInfo doesn't exist`);
            }

            // query info of cashierSaleInfo specified by id
            if (cashierSaleInfo.id) {
                cashierSaleInfo = await this.service.dbHelp.query('cashierSalesInfo', ['*'], { id: cashierSaleInfo });
                return {
                    code: 200,
                    data: cashierSaleInfo && cashierSaleInfo[0]
                };
            }

            // query info of cashierSaleInfo specified by attributes without cashierSaleInfo's id
            const cashierSalesInfo = await this.service.query('cashierSalesInfo', ['*'], cashierSalesInfo);
            return {
                code: 200,
                data: cashierSalesInfo
            };
        }
    }

    return CashierSalesInfo;
}