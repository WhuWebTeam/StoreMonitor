module.exports = app => {
    class CashierSalesInfo extends app.Service {

        // constructor of class CashierSalesInfo
        constructor() {
            
            // default value of table cashierSalesInfo
            this.table = {
                cashierId: '0000000000',
                transId: '',
                ts: 0,
                duration: 0,
                amount: 0,
                rate: 0
            };
        }


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

            return ts && ts[0] && ts[0].max || 0;
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


        // migrate new data from bills to cashierSalesInfo
        async migrate() {
            const ts = await this.maxTs();

            const str = `insert into cashierSalesInfo(cashierId, transId, ts, duration, amount, rate)
                         select b.cashierId, b.transId, b.ts, c.duration, b.amount, 
                             case when b.amount = 0 then 0
                                 else c.duration / b.amount
                                 end rate
                         from bills b inner join 
                             (select transId, max(ts) - min(ts) duration
                             from bills
                             where ts > $1
                             group by transId) c on b.transId = c.transId
                         where ts > $1`;

            try {
                await this.app.db.query(str, [ts]);
                await this.service.logger.logDefault('running', 'migrate new data from bills to cashierSalesInfo successed');
            } catch (err) {
                await this.service.logger.logDefault('error', `migrate new data from bills to cashierSalesInfo failed: ${err}`);
            }
        }
    }

    return CashierSalesInfo;
}