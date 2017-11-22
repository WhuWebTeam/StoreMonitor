

/**
 * Service class of table CustomerSalesInfo
 * @class CustomerSalesInfo
 * @since 1.0.0
 */
module.exports = app => {
    class CustomerSalesInfo extends app.Service {

        /**
         * Constructor of class CustomerSalesInfo
         * @param {Object} app - egg application
         * @constructor
         * @since 1.0.0
         */
        constructor(app) {

            // constructor of app.Service
            super(app);

            // the default value table cutomerSalesInfo
            this.table = {
                id: undefined,
                customerId: undefined,
                transId: undefined,
                productId: undefined,
                ts: undefined,
                price: undefined,
                quantity: undefined,
                amount: undefined
            };
        }


        /**
         * Judge customerSalesInfo exists or not
         * @public
         * @function exists
         * @param {Number} ts - eventList record occurrent time
         * @return {Promise<Boolean>}
         * true when customerSalesInfo exists
         * false when customerSaleInfo doesn't exist
         * @since 1.0.0
         */
        async exists(ts) {

            // parameter doesn't exist
            if (!this.service.util.parameterExists(ts)) {
                return false;
            }

            // parameter exists
            try {
                // customerSaleInfo exist
                if (await this.service.dbHelp.count('CustomerSalesInfo', 'ts', { ts })) {
                    return true;
                }

                // customerSaleInfo doesn't exists
                return false;
            } catch (err) {
                return false;
            }
        }


        /**
         * Judge customerSalesInfo exsits or not through customerSalesInfo
         * @public
         * @function existsId
         * @param {number} id - serial number of customerSalesInfo record
         * @return {Promise<Boolean>}
         * true when customerSalesInfo exists
         * false when customerSalesInfo doesn't exist
         * @since 1.0.0
         */
        async existsId(id) {

            // parameter doesn't exist
            if (!this.servcie.util.parameterExists(id)) {
                return false;
            }

            // parameter exists
            try {
                // customerSaleInfo doesn't exist
                if (await this.service.dbHelp.count('customerSalesInfo', 'id', { id })) {
                    return true;
                }

                // customerSaleInfo exists
                return false;
            } catch (err) {
                return false;
            }
        }


        /**
         * Query customerSaleInfo specified by id, customerId, transId, price, quantity, amount
         * @public
         * @function query
         * @param {Object} customerSaleInfo - condition when query customerSalesInfo
         * @param {Array[String]} attributes - attributes wanted to query
         * @return {Promise<Boolean>}
         * {} when query result set doesn't exist
         * Object when query condition just includes id, ts
         * Array[Object] when query condition without id and ts
         * @since 1.0.0
         */
        async query(customerSaleInfo, attributes = ['*']) {

            // formate customerSaleInfo's attributes and query's attributes
            customerSaleInfo = this.service.util.setTableValue(this.table, customerSaleInfo);
            attributes = this.service.util.setQueryAttributes(this.table, attributes);

            // customerSaleInfo doesn't exist through id
            if (customerSaleInfo.id && !await this.existsId(customerSaleInfo.id)) {
                return {};
            }

            // customerSaleInfo doesn't exist through ts
            if (customerSaleInfo.ts && !await this.exists(customerSaleInfo.ts)) {
                return {};
            }

            try {
                // query info of customerSaleInfo specified by id
                if (customerSaleInfo.id) {
                    customerSaleInfo = await this.service.dbHelp.query('customerSalesInfo', attributes, { id: customerSaleInfo.id });
                    return customerSaleInfo && customerSaleInfo[0];
                }

                // query info of customerSaleInfo specified by ts
                if (customerSaleInfo.ts) {
                    customerSaleInfo = await this.service.dbHelp.query('customerSalesInfo', attributes, { ts: customerSaleInfo.ts });
                    return customerSaleInfo && customerSaleInfo[0];
                }

                // query info of customerSaleInfo specified by attributes without customerSaleInfo's id
                const customerSalesInfo = await this.servcie.dbHelp.query('customerSalesInfo', attributes, customerSaleInfo);
                return customerSalesInfo;
            } catch(err) {
                return {};
            }
        }


        /**
         * Count customerSaleInfo record satisfied some query condition
         * @public
         * @function count
         * @param {Object} customerSaleInfo - condition when query customerSalesInfo
         * @param {Array[String]} attributes - attributes wanted to count
         * @return {Promise<Boolean>}
         * 0 when count error or result is 0
         * number not 0 when query successed and not 0
         * @since 1.0.0
         */
        async count(customerSaleInfo, attributes = ['*']) {

            // format customerSaleInfo's attributes and query's attributes
            customerSaleInfo = this.service.util.setTableValue(this.table, customerSaleInfo);
            attributes = this.service.util.setQueryAttributes(this.table, attributes);

            try {
                return await this.service.dbHelp.count('customerSalesInfo', attributes[0], customerSaleInfo);
            } catch (err) {
                return 0;
            }
        }


        /**
         * Insert customerSaleInfo queried from bills to CustomerSalesInfo
         * @public
         * @member customerSalesInfo#insert
         * @param {Object} customerSaleInfo - customerSalesInfo record
         * @return {Promise<Boolean>}
         * true when insert successed
         * false when insert failed
         * @since 1.0.0
         */
        async insert(customerSaleInfo) {

            // format customerSaleInfo's attributes
            customerSaleInfo = this.service.util.setTableValue(this.table, customerSaleInfo);

            // customerSalesInfo exists
            if (await this.exists(customerSaleInfo.ts)) {
                return false;
            }

            // add a new customerSalesInfo record
            try {
                await this.service.dbHelp.insert('customerSalesInfo', customerSaleInfo);
                return true;
            } catch (err) {
                return false;
            }
        }


        /**
         * Update customerSaleInfo satisfied some query condition
         * @public
         * @function update
         * @param {Object} customerSaleInfo - customerSalesInfo record waited to update
         * @param {Object} wheres - condition when update customerSales record
         * @return {Promise<Boolean>}
         * true when update customerSalesInfo successed
         * false when update customerSalesInfo failed
         * @since 1.0.0
         */
        async update(customerSaleInfo, wheres = { ts: customerSaleInfo.ts }) {

            // format customerSaleInfo and where's attributes
            customerSaleInfo = this.service.util.setTableValue(this.table, customerSaleInfo);
            attributes = this.service.util.setTableValue(this.table, wheres);

            // customerSaleInfo doesn't exist
            if (customerSaleInfo.ts && !await this.exists(customerSaleInfo.ts)) {
                return false;
            }

            try {
                await this.service.dbHelp.update('customerSalesInfo', customerSaleInfo, wheres);
                return true;
            } catch (err) {
                return false;
            }
        }


        /**
         * Delete customerSaleInfo satisfied some query condition
         * @param {Object} customerSaleInfo - condition when delete customerSalesInfo
         * @return {Promise<Boolean>}
         * true when delete customerSalesInfo successed
         * false when delete customerSalesInfo failed
         * @since 1.0.0
         */
        async delete(customerSaleInfo) {

            // format customerSaleInfo's attributes
            customerSaleInfo = this.service.util.setTableValue(this.table, customerSaleInfo);

            // customeSaleInfo doesn't exist
            if (customerSaleInfo.ts &&!await this.exists(customerSaleInfo.ts)) {
                return false;
            }

            try {
                await this.service.dbHelp.delete('customerSalesInfo', customerSaleInfo);
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
         * Migrate new data from bills to customerSalesInfo
         * @public
         * @function migrate
         * @since 1.0.0
         */
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