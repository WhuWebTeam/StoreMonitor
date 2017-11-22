

/**
 * Service constructor of table cashierSalesInfo
 * @class CashierSalesInfo
 * @since 1.0.0
 */
module.exports = app => {
    class CashierSalesInfo extends app.Service {

        /**
         * Constructor of class CashierSalesInfo
         * @param {Ojbect} app - egg application
         * @constructor
         * @since 1.0.0
         */
        constructor(app) {

            // constructor of app.Service
            super(app);

            // the default value of table cashierSalesInfo
            this.table = {
                id: undefined,
                cashierId: undefined,
                transId: undefined,
                ts: undefined,
                duration: undefined,
                amount: undefined,
                rate: undefined
            };
        }


        /**
         * Judge cashierSalesInfo exists or not through ts
         * @public
         * @function exists
         * @param {number} ts - eventlist's occurrent time
         * @return {Promise<Boolean>}
         * true cashierSalesInfo exists
         * false cashierSalesInfo doesn't exist
         * @since 1.0.0
         */
        async exists(ts) {

            // parameter doesn't exist
            if (!this.service.util.parameterExists(ts)) {
                return false;
            }

            try {
                // cashierSaleInfo exists
                if (await this.service.dbHelp.count('cashierSalesInfo', 'ts', { ts })) {
                    return true;
                }

                // cashierSaleInfo doesn't exist
                return false;
            } catch (err) {
                return false;
            }
        }


        /**
         * Judge cashierSaleInfo exists or not through id
         * @public
         * @function existsId
         * @param {number} id - cashierSalesInfo's seiral number
         * @return {Promise<Boolean>}
         * true when cashierSaleInfo exist
         * false when cashierSaleInfo doesn't exist
         * @since 1.0.0
         */
        async existsId(id) {

            // parameter doesn't exist
            if (!this.service.util.parameterExists(id)) {
                return false;
            }

            try {
                // cashierSaleInfo exists
                if (await this.service.dbHelp.count('cashierSalesInfo', 'id', { id })) {
                    return true;
                }

                // cashierSaleInfo doesn't exist
                return false;
            } catch (err) {
                return false;
            }
        }


        /**
         * Query cashierSalesInfo with condition query or not
         * @public
         * @function query
         * @param {Object} cashierSaleInfo - condition when query cashierSalesInfo
         * @param {Array[String]} attributes - attributes wanted to query
         * @return {Promise<Boolean>}
         * {} when query result set doesn't exist
         * Object when query condition just includes id or ts
         * Array[Object] when query condition without id and ts
         * @since 1.0.0
         */
        async query(cashierSaleInfo, attributes = ['*']) {

            // setcashierSalesInfo's attributes and query attributes
            cashierSaleInfo = this.service.util.setTableValue(this.table, cashierSaleInfo);
            attributes = this.service.util.setQueryAttributes(this.table, attributes);

            // cashierSaleInfo doesn't exist throught cashierSaleInfo.id
            if (cashierSaleInfo.id && !await this.existsId(cashierSaleInfo.id)) {
                return {};
            }

            // cashierSaleInfo doesn't exist through cashierSaleInfo.ts
            if (cashierSaleInfo.ts && !await this.exists(cashierSaleInfo.ts)) {
                return {};
            }

            try {
                // query info of cashierSaleInfo specified by id
                if (cashierSaleInfo.id) {
                    cashierSaleInfo = await this.service.dbHelp.query('cashierSalesInfo', attributes, { id: cashierSaleInfo.id });
                    return cashierSaleInfo && cashierSaleInfo[0];
                }

                // query info of cashierSaleInfo specified by ts
                if (cashierSaleInfo.ts) {
                    cashierSaleInfo = await this.service.dbHelp.query('cashierSalesInfo', attributes, { ts: cashierSaleInfo.ts });
                    return cashierSaleInfo && cashierSaleInfo[0];
                }

                // query info of cashierSaleInfo specified by attributes without cashierSaleInfo's id
                const cashierSalesInfo = await this.service.dbHelp.query('cashierSalesInfo', attributes, cashierSaleInfo);
                return cashierSalesInfo;
            } catch (err) {
                return {};
            }
        }


        /**
         * Count the CashierSaleInfo record with some condition
         * @public
         * @function count
         * @param {Object} cashierSaleInfo -  condition when count cashierSalesInfo record
         * @param {Array[String]} attributes - attributes wanted to count but just use first attribute
         * @return {Promise[Number]}
         * 0 when count error or result is 0
         * number not 0 when count successed and not 0
         * @since 1.0.0
         */
        async count(cashierSaleInfo, attributes = ['*']) {

            // format cashierSaleInfo's attributes and query attributes
            cashierSaleInfo = this.service.util.setTableValue(this.table, cashierSaleInfo);
            attributes = this.service.util.setQueryAttributes(this.table, attributes);

            try {
                return await this.service.dbHelp.count('cashierSalesInfo', attributes[0], cashierSaleInfo);
            } catch (err) {
                return 0;
            }
        }


        /**
         * Insert cashierSalesInfo queried from bills to cashierSalesInfo
         * @public
         * @function insert
         * @param {Object} cashierSaleInfo - cashierSaleInfo record waited to insert into cashierSalesInfo
         * @return {Promise<Boolean>}
         * true when insert record successed
         * false when insert record failed
         * @since 1.0.0
         */
        async insert(cashierSaleInfo) {

            // format cashierSaleInfo's attributes
            cashierSaleInfo = this.service.util.setTableValue(this.table, cashierSaleInfo);

            // cashierSaleInfo's ts doesn't exist
            if (!cashierSaleInfo.ts) {
                return false;
            }

            // cashierSaleInfo doesn't exist
            if (await this.exists(cashierSaleInfo.ts)) {
                return false;
            }

            try {
                await this.service.dbHelp.insert('cashierSalesInfo', cashierSaleInfo);
                return true;
            } catch (err) {
                return false;
            }
        }


        /**
         * Update cashierSalesInfo with some condition
         * @public
         * @function update
         * @param {Object} cashierSaleInfo - cashierSaleInfo record waited to update
         * @param {Object} wheres -condition when update cashierSaleInfo record
         * @return {Promise<Boolean>}
         * true when update cashierSaleInfo successed
         * false when update cashierSaleInfo failed
         * @since 1.0.0
         */
        async update(cashierSaleInfo, wheres = { ts: cashierSaleInfo.ts }) {

            // format cashierSaleInfo's attributes and wheres' attributes
            cashierSaleInfo = this.service.util.setTableValue(this.table, cashierSaleInfo);
            wheres = this.service.util.setTableValue(this.table, wheres);

            // cashierSaleInfo doesn't exist
            if (cashierSaleInfo.ts && !await this.exists(cashierSaleInfo.ts)) {
                return false;
            }

            try {
                await this.service.dbHelp.update('cashierSalesInfo', cashierSaleInfo, wheres);
                return true;
            } catch (err) {
                return false;
            }
        }


        /**
         * Delete cashierSaleInfo with some condition
         * @public
         * @function delete
         * @param {Object} cashierSaleInfo - condition when delete cashierSaleInfo
         * @return {Promise<Boolean>}
         * true when delete cashierSaleInfo successed
         * false when delete cashierSaleInfo failed
         * @since 1.0.0
         */
        async delete(cashierSaleInfo) {

            // format cashierSaleInfo's attributes
            cashierSaleInfo = this.service.util.setTableValue(this.table, cashierSaleInfo);

            // cashierSaleInfo doesn't exist
            if (cashierSaleInfo.ts && !await this.exists(cashierSaleInfo.ts)) {
                return false;
            }

            try {
                await this.service.dbHelp.delete('cashierSalesInfo', cashierSaleInfo);
                return true;
            } catch (err) {
                return false;
            }
        }


        /**
         * Query max ts time
         * @public
         * @function maxTs
         * @return {Promise<Number>}
         * get the log's max time
         * @since 1.0.0
         */
        async maxTs() {
            let ts = await this.query({}, ['max(ts)']);
            ts = ts[0] && ts[0].max || Date.parse(new Date());
            return ts;
        }


        /**
         * Migrate new data from bills to cashierSalesInfo
         * @public
         * @function migrate
         * @since 1.0.0
         */
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