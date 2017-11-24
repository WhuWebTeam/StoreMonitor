

/**
 * Service class of table bills
 * @class Bills
 * @since 1.0.0
 */
module.exports = app => {
    class Bills extends app.Controller {

        /**
         * Constructor of class Bills
         * @param {Object} app - egg application
         * @constructor
         * @since 1.0.0
         */
        constructor(app) {

            // constructor of app.Service
            super(app);

            // default value of table bills
            this.table = {
                id: undefined,
                sysKey: undefined,
                transId: undefined,
                ts: undefined,
                shopId: undefined,
                counterId: undefined,
                scriptVer: undefined,
                productId: undefined,
                price: undefined,
                quantity: undefined,
                amount: undefined,
                cashierId: undefined,
                customerId: undefined,
                eventFlag: undefined
            };
        }


        /**
         * Judge bill exists or not through sysKey
         * @public
         * @function exists
         * @param {Number} sysKey - bill's occurentTime
         * @return {Promise<Boolean>}
         * true when bill exists
         * falsewhen bill doesn't exists
         * @since 1.0.0
         */
        async exists(sysKey) {

            // parameter doesn't exist
            if (!this.service.util.parameterExists(sysKey)) {
                return false;
            }

            // parameter exists
            try {
                // bills exists
                if (await this.service.dbHelp.count('bills', 'sysKey', { sysKey })) {
                    return true;
                }

                // bills doesn't exist
                return false;
            } catch (err) {
                return false;
            }
        }


        /**
         * Judge bill exists or not through id
         * @public
         * @function existsId
         * @param {Number} id - table bills element serial number
         * @return {Promise<Boolean>}
         * true when bill exists
         * false when bill doesn't exist
         * @since 1.0.0
         */
        async existsId(id) {

            // parameter doesn't exist
            if (!this.service.util.parameterExists(id)) {
                return false;
            }

            // parameter exists
            try {
                // bills exists
                if (await this.service.dbHelp.count('bills', 'id', { id })) {
                    return true;
                }

                // bills doesn't exist
                return false;
            } catch (err) {
                return false;
            }
        }
        

        /**
         * Query info of bills with some condition
         * @public
         * @function query
         * @param {Object} bill - condition when query bills
         * @param {Array[String]} attributes - attributes wanted to query
         * @return {Object}
         * {} when query result set is null
         * Object when query condition just includes bill.id or bill.sysKey
         * Array[Object] when query condition without bill.id or bill.sysKey
         * @since 1.0.0
         */
        async query(bill, attributes = ['*']) {

            // format bill's attributes and query attributes
            bill = this.service.util.setTableValue(this.table, bill);
            attributes = this.service.util.setQueryAttributes(this.table, attributes);

            // bill doesn't exist through id
            if (bill.id && !await this.existsId(bill.id)) {
                return {};
            }

            // bill doesn't exists through sysKey
            if (bill.sysKey && !await this.exists(bill.sysKey)) {
                return {};
            }

            try {

                // get info through id if id exists
                if (bill.id) {
                    bill = await this.service.dbHelp.query('bills', attributes, { id: bill.id });
                    return bill && bill[0];
                }

                //get info through sysKey if sysKey exists
                if (bill.sysKey) {
                    bill = await this.service.dbHelp.query('bills', attributes, { sysKey: bill.sysKey });
                    return bill && bill[0];
                }

                // get info with condition without sysKey and id
                const bills = await this.service.dbHelp.query('bills', attributes, bill);
                return bill;
            } catch (err) {
                return {};
            }
        }


        /**
         * Count bill records with some condition
         * @public
         * @function count
         * @param {Object} bill - condition when count bills record
         * @param {Array[String]} attributes - attributes wanted to query
         * @return {Promise<Boolean>}
         * 0 when count error or result is 0
         * number not 0 when count successed and not 0
         * @since 1.0.0
         */
        async count(bill, attributes = ['*']) {

            // format bill's attributes and query attributes
            bill = this.service.util.setTableValue(this.table, bill);
            attributes = this.service.util.setQueryAttributes(this.table, bill);

            try {
                return await this.service.dbHelp.count('bills', attributes[0], bill);
            } catch (err) {
                return 0;
            }
        }


        /**
         * Insert a bill record to bills
         * @public
         * @function insert
         * @param {Object} bill - bill record waited to insert into bills
         * @return {Promise<Boolean>}
         * true when insert bill record to bills successed
         * false when insert bill record into bills failed
         * @since 1.0.0
         */
        async insert(bill) {

            // format bill's attributes
            bill = this.service.util.setTableValue(this.table, bill);

            // bill.sysKey doesn't exists
            if (!bill.sysKey) {
                return false;
            }

            // bill exists
            if (await this.exists(bill.sysKey)) {
                return false;
            }

            try {
                // insert bill to bills
                await this.service.dbHelp.insert('bills', bill);
                return true;
            } catch (err) {
                return false;
            }
        }


        /**
         * Update table bills with some condition
         * @public
         * @function update
         * @param {Object} bill - bill record waited to update
         * @param {Object} wheres - condition when update bills
         * @return {Promise<Boolean>}
         * true when update bills successed
         * false when update bill failed
         * @since 1.0.0
         */
        async update(bill, wheres = { sysKey: bill.sysKey }) {

            // format bill's attributes and wheres' attributes
            bill = this.service.util.setTableValue(this.table, bill);
            wheres = this.service.util.setTableValue(this.table, wheres);

            // bill doesn't exist
            if (bill.sysKey && !await this.exists(bill.sysKey)) {
                return false;
            }

            try {
                await this.service.dbHelp.update('bills', bill, wheres);
                return true;
            } catch (err) {
                return false;
            }
        }



        /**
         * Delete table bills with some condition
         * @public
         * @function delete
         * @param {Object} bill - condition when delete bills satisfied some condition
         * @return {Promise<Boolean>}
         * true when update bills successed
         * false when update bills failed
         * @since 1.0.0
         */
        async delete(bill) {

            // format bill's attributes
            bill = this.service.util.setTableValue(this.table, bill);

            // bill doesn't exists
            if (bill.sysKey && !await this.exists(bill.sysKey)) {
                return false;
            }

            // bill exists
            try {
                await this.service.dbHelp.delete('bills', bill);
                return true;
            } catch (err) {
                return false;
            }
        }
    }

    return Bills;
}