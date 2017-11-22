

/**
 * Service class of table cashiers
 * @class Cashiers
 * @since 1.0.0
 */
module.exports = app => {
    class Cashiers extends app.Service {

        /**
         * Constructor of class Cashiers
         * @param {Object} app - egg application
         * @constructor
         * @since 1.0.0
         */
        constructor(app) {

            // constructor of app.Service
            super(app);

            // default value of
            this.table = {
                id: undefined,
                name: undefined
            };
        }


        /**
         * Judge cashier exists or not
         * @public
         * @function exists
         * @param {String} id - Cashier's register code
         * @return {Promise<Boolean>}
         * true when cashier exists
         * false when cashier doesn't exists
         * @since 1.0.0
         */
        async exists(id) {

            // parameter doesn't exist
            if (!this.service.util.parameterExists(id)) {
                return false;
            }

            // parameter exists
            try {
                // cashier exists
                if (await this.service.dbHelp.count('cashiers', 'id', { id })) {
                    return true;
                }

                // cashier does't exist
                return false;
            } catch (err) {
                return false;
            }
        }


        /**
         * Query cashiers with condition query or not
         * @public
         * @function query
         * @param {Object} cashier - condition of query table cashiers
         * @param {Array[String]} attributes - attributes wanted to query
         * @return {Promise<Object>}
         * {} when query result set is null
         * Object when query condition just includes cashier.id
         * Array[Object] when query condition without cashier.id
         * @since 1.0.0
         */
        async query(cashier, attributes = ['*']) {

            // format cashier's attributes and query attributes
            cashier = this.service.util.setTableValue(this.table, cashier);
            attributes = this.service.util.setQueryAttributes(this.table, attributes);

            // cashier doesn't exists
            if (cashier.id && !await this.exists(cashier.id)) {
                return {};
            }

            try {
                // get info of cashier specified by cashier id
                if (cashier.id) {
                    cashier = await this.service.dbHelp.query('cashiers', attributes, { id: cashier.id });
                    return cashier && cashier[0];
                }

                // get info of cashiers secified by other attributes
                const cashiers = await this.service.dbHelp.query('cashiers', attributes, cashier);
                return cashiers;
            } catch (err) {
                return 0;
            }
        }


        /**
         * Count the cashier records' number satisfied some query condition
         * @public
         * @function count
         * @param {Object} cashier - condition when count cashier records
         * @param {Array[String]} attributes - attributes used to count but just use first attribute
         * @return {Promsie<Nubmer>}
         * 0 when count error or count result is 0
         * number without 0 when query successed and not 0
         * @since 1.0.0
         */
        async count(cashier, attributes = ['*']) {

            // format cashier's attributes and query attributes
            cashier = this.service.util.setTableValue(this.table, cashier);
            attributes = this.service.util.setQueryAttributes(this.table, attributes);

            try {
                return await this.service.dbHelp.count('cashiers', attributes[0], cashier);
            } catch (err) {
                return 0;
            }
        }


        /**
         * Insert record to cashiers
         * @public
         * @function insert
         * @param {Object} cashier - cashier record waited to insert into cashiers
         * @return {Promise<Boolean>}
         * true when insert cashier record successed
         * false when insert cashier record failed
         * @since 1.0.0
         */
        async insert(cashier) {

            // format cashier's attributes
            cashier = this.service.util.setTableValue(this.table, cashier);

            // cashier.id doesn't exist
            if (!cashier.id) {
                return false;
            }

            // cashier exists
            if (await this.exists(cashier.id)) {
                return false;
            }

            try {
                // add a new cashier
                await this.service.dbHelp.insert('cashiers', cashier);
                return true;
            } catch (err) {
                return false;
            }
        }


        /**
         * Update cashier records with some query condition
         * @public
         * @function update
         * @param {Object} cashier - cashier record waited to update
         * @param {Object} wheres - condition when update cashiers
         * @return {Promise<Boolean>}
         * true when update cashier record successed
         * false when update cashier record failed
         * @since 1.0.0
         */
        async update(cashier, wheres = { id: cashier.id }) {

            // format cashier's attributes and wheres' attributes
            cashier = this.service.util.setTableValue(this.table, cashier);
            wheres = this.service.util.setTableValue(this.table, wheres);

            // cashier doesn't exist
            if (cashier.id && !await this.exists(cashre.id)) {
                return false;
            }

            try {
                // update cashier records' info with query condition
                await this.service.dbHelp.update('cashiers', cashier, wheres);
                return true;
            } catch (err) {
                return false;
            }
        }


        /**
         * Delete cashier record satisfied some query condition
         * @public
         * @function delete
         * @param {Object} cashier - condition when delete cashier records
         * @return {Promise<Boolean>}
         * true when delete cashier records successed
         * false when delete cashier records failed
         */
        async delete(cashier) {

            // format cashier's attributes
            cashier = this.service.util.setTableValue(this.table, cashier);

            // cashier doesn't exist
            if (cashier.id && !await this.exists(cashier.id)) {
                return false;
            }

            // cashier exists
            try {
                await this.service.dbHelp.delete('cashiers', cashier);
                return true;
            } catch (err) {
                return false;
            }
        }
    }

    return Cashiers;
}