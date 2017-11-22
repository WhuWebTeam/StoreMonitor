

/**
 * Service constructor of table customers
 * @class Customers
 * @since 1.0.0
 */
module.exports = app => {
    class Customers extends app.Service {

        /**
         * Constructor of class Customers
         * @param {Object} app - egg application
         * @constructor
         * @since 1.0.0
         */
        constructor(app) {

            // constructor of app.Service
            super(app);

            // default value of table customers
            this.table = {
                id: undefined,
                name: undefined,
                type: undefined
            };
        }


        /**
         * Judge customer exists or not
         * @public
         * @function exists
         * @param {String} id - customer's register code
         * @return {Promise<Boolean>}
         * true when customer exists
         * false when customer doesn't exist
         * @since 1.0.0
         */
        async exists(id) {

            // parameter doesn't exist
            if (!this.service.util.parameterExists(id)) {
                return false;
            }

            // parameter exists
            try {
                // customer exists
                if (await this.service.dbHelp.count('customers', 'id', { id })) {
                    return true;
                }

                // customer doesn't exists
                return false;
            } catch (err) {
                return false;
            }
        }


        /**
         * Query customers with condition query or not
         * @public
         * @function query
         * @param {Object} customer - condition when query customer records
         * @param {Array[String]} attributes - attributes wanted to be query
         * @return {Promise<Object>}
         * {} when no query result set
         * Object when query condition just includes customer's id
         * Array[Object] when query condition without customer's id
         * @since 1.0.0
         */
        async query(customer, attributes = ['*']) {

            // format customer's attributes and query attributes
            customer = this.service.util.setTableValue(this.table, customer);
            attributes = this.service.util.setQueryAttributes(this.table, attributes);

            // customer doesn't exists
            if (customer.id && !await this.exists(customer.id)) {
                return {};
            }

            try {
                // get info of customer specified by id
                if (customer.id) {
                    customer = await this.service.dbHelp.query('customers', attributes, { id: customer.id });
                    return customer && customer[0];
                }

                // get info of customer specified by other attributes
                const customers = await this.service.dbHelp.query('customers', attributes, customer);
                return customers;
            } catch (err) {
                return {};
            }
        }


        /**
         * Count the customer records number with some condition
         * @public
         * @function count
         * @param {Object} customer - condition when count customer records
         * @param {Array[String]} attributes - attributes wanted to count but just use first attribute
         * @return {Promise<Number>}
         * 0 when count error or count result is 0
         * number not 0 when count successed and not 0
         * @since 1.0.0
         */
        async count(customer, attributes = { id: customer.id }) {

            // format customer's attributes and query attributes
            customer = this.service.util.setTableValue(this.table, customer);
            attributes = this.service.util.setQueryAttributes(this.table, attributes);

            try {
                return await this.service.dbHelp.count('customers', attributes[0], customer);
            } catch (err) {
                return 0;
            }
        }


        /**
         * Insert customer to customers
         * @public
         * @function insert
         * @param {Object} customer - customer record
         * @return {Promise<Boolean>}
         * true when insert customer record successed
         * false when insert customer record failed
         * @since 1.0.0
         */
        async insert(customer) {

            // format customer's attributes
            customer = this.service.util.setTableValue(this.table, customer);

            // customer.id doesn't exist
            if (!customer.id) {
                return false;
            }

            // customer exists
            if (await this.exists(customer.id)) {
                return false;
            }

            try {
                // add a new customer record
                await this.service.dbHelp.insert('customers', customer);
                return true;
            } catch (err) {
                return false;
            }
        }


        /**
         * Update customer record with some query condition
         * @public
         * @function update
         * @param {Object} customer - customer record waited to update
         * @param {Object} wheres - condition when update customer record
         * @return {Promise<Boolean>}
         * true when update customer record sueccessed
         * false when update cusomter record failed
         * @since 1.0.0
         */
        async update(customer, wheres = { id: customer.id }) {

            // format customer's attributes and where's attributes
            customer = this.service.util.setTableValue(this.table, customer);
            wheres = this.service.util.setTableValue(this.table, wheres);

            // customer doesn't exist
            if (customer.id && !await this.exists(customer.id)) {
                return false;
            }

            try {
                // update table customers
                await this.service.dbHelp.update('customers', customer, wheres);
                return true;
            } catch (err) {
                return false;
            }
        }


        /**
         * Delete customer record from table customers
         * @public
         * @function delete
         * @param {Object} customer - condition when delete customer
         * @return {Promise<Boolean>}
         * true when delete cusotmer record successed
         * false when delete customer record failed
         * @since 1.0.0
         */
        async delete(customer) {

            // format customer's attributes
            customer = this.service.util.setTableValue(this.table, customer);

            // customer doesn't exist
            if (customer.id && !await this.exists(customer.id)) {
                return false;
            }

            // customer exists
            try {
                await this.service.dbHelp.delete('customers', customer);
                return true;
            } catch (err) {
                return false;
            }
        }
    }

    return Customers;
}