

/**
 * Service class of table counters
 * @class Conuters
 * @since 1.0.0
 */
module.exports = app => {
    class Counters extends app.Service {

        /**
         * Constructor of class Counters
         * @param {Object} app - egg application
         * @constructor
         * @since 1.0.0
         */
        constructor(app) {

            // constructor of app.Service
            super(app);

            // default value table counters
            this.table = {
                id: undefined,
                shopId: undefined,
                type: undefined,
                details: undefined,
                assigned: undefined
            };
        }


        /**
         * Judge counter exists or not
         * @public
         * @function exists
         * @param {String} id - counter's register code
         * @return {Promise<Boolean>}
         * true when counter exists
         * false when conuter doesn't exist
         * @since 1.0.0
         */
        async exists(id) {

            // parameter doesn't exist
            if (!this.service.util.parameterExists(id)) {
                return false;
            }

            try {
                // counter exists
                if (await this.service.dbHelp.count('counters', id, { id })) {
                    return true;
                }

                // counter doesn't exist
                return false;
            } catch (err) {
                return false;
            }
        }


        /**
         * Query info of counters specified by id, shopId, type or details
         * @public
         * @function query
         * @param {Object} counter - query condition of query table counters
         * @param {Array[String]} attributes - attributes wanted to query
         * @return {Promise<Object>}
         * {} when query set doesn't exist
         * Object when query condition includes counter.id
         * Array[Object] when query condition without counter.id
         * @since 1.0.0
         */
        async query(counter, attributes = ['*']) {

            // format counter attributes and query attributes
            counter = this.service.util.setTableValue(this.table, counter);
            attributes = this.service.util.setQueryAttributes(this.table, attributes);

            // counter doesn't exist
            if (counter.id && !await this.exists(counter.id)) {
                return {};
            }

            try {
                // query info of counter specified by id
                if (counter.id) {
                    counter = await this.service.dbHelp.query('counters', attributes, { id: counter.id });
                    return counter && counter[0];
                }

                // query info of some counters without id attributes
                const counters = await this.service.dbHelp.query('counters', attributes, counter);
                return counters;
            } catch (err) {
                return {};
            }
        }


        /**
         * Count the counter records' number satisfied come condition
         * @public
         * @function count
         * @param {Obejct} counter - query condition when count counter records
         * @param {Array[String]} attributes - attributes wanted t count but just use first attribute
         * @return {Promise<Number>}
         * 0 when count error or result 0
         * number when count successed and not 0
         * @since 1.0.0
         */
        async count(counter, attributes = ['*']) {

            // format counter's attributes and query attributes
            counter = this.service.util.setTableValue(this.table, counter);
            attributes = this.service.util.setQueryAttributes(this.table, attributes);

            try {
                return await this.service.dbHelp.count('counters', attributes[0], counter);
            } catch (err) {
                return 0;
            }
        }


        /**
         * Insert a counter into counters
         * @public
         * @function insert
         * @param {Object} counter - counter record
         * @return {Promsie<Boolean>}
         * true when insert counter record successed
         * false when insert counter record failed
         * @since 1.0.0
         */
        async insert(counter) {
            
            // format counter record's attributes
            counter = this.service.util.setTableValue(this.table, counter);
            
            // counter.id doesn't exist
            if (!counter.id) {
                return false;
            }

            // counter record exists
            if (await this.exists(counter.id)) {
                return false;
            }

            try {
                // insert shop record to shops
                await this.service.dbHelp.insert('counters', counter);
                return true;
            } catch (err) {
                return false;
            }
        }


        /**
         * Update info of some counter satsfied some condition
         * @public
         * @function update
         * @param {Object} counter - counter record
         * @param {Array[String]} wheres  - attributes wanted when update counter
         * @return {Promsie<Boolean>}
         * true when update counter record successed
         * false when update counter record failed
         *
         */
        async update(counter, wheres = { id: counter.id }) {

            // formate counter's attributes and wheres attributes
            counter = this.service.util.setTableValue(this.table, counter);
            wheres = this.service.util.setTableValue(this.table, wheres);

            // counter doesn't exist
            if (counter.id && !await this.exists(counter.id)) {
                return false;
            }

            // shop's id doesn't exists when shopId attributes included by counter
            if (counter.shopId && !await this.service.shops.exists(counter.shopId)) {
                return false;
            }

            try {
                // modify counter info
                await this.service.dbHelp.update('counters', counter, wheres);
                return true;
            } catch (err) {
                return false;
            }
        }


        /**
         * Delete some counter records satisfied some cndition
         * @public
         * @function delete
         * @param {Object} counter - query condition when delete counter records
         * @return {Promise<Boolean>}
         * true when delete counter records successed
         * false when delete conuter records failed
         */
        async delete(counter) {

            // format counter's attributes
            counter = this.service.util.setTableValue(this.table, counter);

            // counter doen't exist
            if (counter.id && !await this.exists(counter.id)) {
                return false;
            }

            try {
                // delete counter record satisfied some query condition
                await this.service.dbHelp.delete('counters', counter);
                return true;
            } catch (err) {
                return false;
            }
        }
    }

    return Counters;
}