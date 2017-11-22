

/**
 * Service constructor of table cashierSalesInfo
 * @class CashierSalesInfo
 * @since 1.0.0
 */
module.exports = app => {
    class ProductSalesInfo extends app.Service {

        /**
         * constructor of class ProductSalesInfo
         * @param {Object} app - egg appliction
         * @constructor
         * @since 1.0.0
         */
        constructor(app) {

            // constructor of app.Service
            super(app);

            // the default value table productSalesInfo
            this.table = {
                id: undefined,
                shopId: undefined,
                productId: undefined,
                transId: undefined,
                ts: undefined,
                price: undefined,
                quantity: undefined,
                amount: undefined
            };
        }


        /**
         * Judge productSaleInfo exists or not through ts
         * @public
         * @function exists
         * @param {Number} ts - eventLitst's occurent time
         * @return {Promise<Boolean>}
         * true when productSaleInfo exists
         * false when productSaleInfo doesn't exist
         * @since 1.0.0
         */
        async exists(ts) {

            // parameter doesn't exist
            if (!this.service.util.parameterExists(ts)) {
                return false;
            }

            try {
                // productSaleInfo exists
                if (await this.service.dbHelp.count('productSalesInfo', 'ts', { ts })) {
                    return true;
                }

                // productSaleInfo doesn't exist
                return false;
            } catch (err) {
                return false;
            }
        }

        /**
         * Judge productSaleInfo exists or not through id
         * @public
         * @function existsId
         * @param {Number} id - productSaleInfo's serial number
         * @return {Promise<Boolean>}
         * true when eventList exists
         * false when eventList doesn't exist
         * @since 1.0.0
         */
        async existsId(id) {

            // parameter doesn't exist
            if (!this.service.util.parameterExists(id)) {
                return false;
            }

            try {
                // productSaleInfo exists
                if (await this.service.dbHelp.count('productSalesInfo', 'id', { id })) {
                    return true;
                }

                // productSaleInfo doesn't exist
                return false;
            } catch (err) {
                return false;
            }
        }


        /**
         * Query info of productSalesInfo satisfied some condition
         * @public
         * @function query
         * @param {Object} productSaleInfo - condition when query productSalesInfo
         * @param {Array[String]} attributes - attributes wanted to query
         * @return {Promise<Object>}
         * {} when query result set doesn't exists
         * Object when query condition includes id or ts
         * Array[Object] when query condition without id and ts
         * @since 1.0.0
         */
        async query(productSaleInfo, attributes = ['*']) {

            // format productSaleInfo and query's attrbutes
            productSaleInfo = this.service.util.setTableValue(this.table, productSaleInfo);
            attributes = this.service.util.setQueryAttributes(this.table, attributes);

            // productSaleInfo doesn't exist through id
            if (productSaleInfo.id && !await this.existsId(productSaleInfo.id)) {
                return {};
            }

            // productSaleInfo doesn't exist through ts
            if (productSaleInfo.ts && !await this.exists(productSaleInfo.ts)) {
                return false;
            }

            try {
                // query info of productSaleInfo specified by productSaleInfo's id
                if (productSaleInfo.id) {
                    productSaleInfo = await this.service.dbHelp.query('productSalesInfo', attributes, { id: productSaleInfo.id });
                    return productSaleInfo && productSaleInfo[0];
                }

                // query info of productSaleInfo specified by productSaleInfo'ts
                if (productSaleInfo.ts) {
                    productSaleInfo = await this.service.dbHelp.query('productSalesInfo', attributes, { ts: productSaleInfo.ts });
                    return productSaleInfo && productSaleInfo[0];
                }

                // query info of productSaleInfo specified by attributes without productSaleInfo's id
                const productSalesInfo = await this.service.dbHelp.query('productSalesInfo', attributes, productSaleInfo);
                return productSaleInfo;
            } catch (err) {
                return false;
            }
        }


        /**
         * Count productSaleInfo record satisfied some condition
         * @public
         * @function count
         * @param {Object} productSaleInfo - condition when count productSalesInfo record
         * @param {Array[String]} attributes - attributes wanted to count but just use the first attribute
         * @return {Promise<Number>}
         * 0 when count error or result is 0
         * number when count successed
         * @since 1.0.0
         */
        async count(productSaleInfo, attributes = ['*']) {

            // format productSaleInfo and query's attributes
            productSaleInfo = this.service.util.setTableValue(this.table, productSaleInfo);
            attributes = this.service.util.setQueryAttributes(this.table, attributes);

            try {
                return await this.service.dbHelp.count('productSalesInfo', attributes[0], productSaleInfo);
            } catch (err) {
                return 0;
            }
        }


        /**
         * Insert productSalesInfo queried from bills to productSalesInfo
         * @public
         * @function insert
         * @param {Object} productSaleInfo - productSaleInfo record
         * @{Promise<Boolean>}
         * true when insert productSaleInfo record successed
         * false when insert productSaleInfo record failed
         * @since 1.0.0
         */
        async insert(productSaleInfo) {

            // fromat productSaleInfo record's attributes
            productSaleInfo = this.service.util.setTableValue(this.table, productSaleInfo);

            // productSaleInfo's ts doesn't exist
            if (!productSaleInfo.ts) {
                return false;
            }

            // productSaleInfo exists
            if (await this.exists(productSaleInfo.ts)) {
                return false;
            }

            try {
                // add a new productSaleInfo to productSalesInfo
                await this.service.dbHelp.insert('productSalesInfo', productSalesInfo);
                return true;
            } catch (err) {
                return false;
            }
        }


        /**
         * Update productSaleInfo record satisfied some condition
         * @public
         * @function update
         * @param {Object} productSaleInfo - product record wanted to update
         * @param {Object} wheres - condition when update productSalesInfo
         * @return {Promise<Boolean>}
         * true when update productSalesInfo record successed
         * false when update productSalesInfo record failed
         * @since 1.0.0
         */
        async update(productSaleInfo, wheres) {

            // format productSaleInfo and query's attributes
            productSaleInfo = this.service.util.setTableValue(this.table, productSaleInfo);
            wheres = this.service.util.setTableValue(this.table, wheres);

            // productSaleInfo doesn't exist
            if (productSaleInfo.ts && !await this.exists(productSaleInfo.ts)) {
                return false;
            }

            try {
                await this.service.dbHelp.update('productSalesInfo', productSaleInfo, wheres);
                return true;
            } catch (err) {
                return false;
            }
        }


        /**
         * Delete productSaleInfo record satisfied some condition
         * @public
         * @function delete
         * @param {Object} productSaleInfo - productSaleInfo record when update producSaleInfo
         * @return {Promise<Boolean>}
         * true when update productSaleInfo successed
         * false when update productSaleInfo failed
         * @since 1.0.0
         */
        async delete(productSaleInfo) {

            // formate productSaleInfo's attributes
            productSaleInfo = this.service.util.setTableValue(this.table, productSaleInfo);

            // productSaleInfo doesn't exist
            if (productSaleInfo.ts && !await this.exists(productSaleInfo.ts)) {
                return false;
            }

            try {
                await this.service.dbHelp.delete('productSalesInfo', productSaleInfo);
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
         * Migrate new data from bills to productSalesInfo
         * @public
         * @function migrate
         * @since 1.0.0
         */
        async migrate() {
            const ts = await this.maxTs();

            const str = `insert into productSalesInfo(shopId, transId, productId, ts, price, quantity, amount)
                         select b.shopId, b.transId, b.productId, b.ts, b.price, b.quantity, b.amount from bills b
                         where ts > $1`;

            try {
                await this.app.db.query(str, [ts]);
                await this.service.logger.logDefault('running', 'migrate new data from bills to productSalesInfo successed')
            } catch (err) {
                await this.service.logger.logDefault('error', 'migrate new data from bills to productSalesInfo failed')
            }
        }
    }

    return ProductSalesInfo;
}