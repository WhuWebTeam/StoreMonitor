

/**
 * Service class of table authorities
 * @class Authorities
 * @since 1.0.0
 */
module.exports = app => {
    class Authorities extends app.Service {

        /**
         * Constructor of class authorities
         * @param {Object} app - egg application
         * @constructor
         * @since 1.0.0
         */
        constructor(app) {

            // app.Service's constructor
            super(app);

            // default value of table authorities
            this.table = {
                id: undefined,
                name: undefined,
                details: undefined
            };
        }


        /**
         * Judge authority exists or not
         * @public
         * @function exists
         * @param {String} id - authority's register code
         * @return {Promise<Boolean>}
         * true when authority record exists
         * false when authority record edoesn't exist
         * @since 1.0.0
         */
        async exists(id) {

            // parameter doesn't exists
            if (!this.service.util.parameterExists(id)) {
                return false;
            }

            try {
                // authority exists
                if (await this.service.dbHelp.count('authorities', 'id', { id })) {
                    return true;
                }

                // authority doesn't exist
                return false;
            } catch (err) {
                return false;
            }
        }


        /**
         * Query info of authorities with condition query or not
         * @public
         * @function query
         * @param {Object} authority - query condition when query table authorities
         * @param {Array[String]} attributes - attributes wanted to query
         * @return {Promise<Object>}
         * {} when query set doesn't exist
         * Object when query condition includes authority.id
         * Array[Object] when query condition without authority.id
         * @since 1.0.0
         */
        async query(authority, attributes = ['*']) {

            // format authority's attributes and query attributes
            authority = this.service.util.setTableValue(this.table, authority);
            attributes = this.service.util.setQueryAttributes(this.table, attributes);

            // authority doesn't exist
            if (authority.id && !await this.exists(authority.id)) {
                return {};
            }

            try {
                // query info of authorities specified by id
                if (authority.id) {
                    authority = await this.service.dbHelp.query('authorities', attributes, { id: authority.id });
                    return authority && authority[0];
                }

                // query info of authorities specified by attributes without id
                const authorities = await this.service.dbHelp.query('authorities', attributes, authority);
                return authorities;
            } catch (err) {
                return {};
            }
        }


        /**
         * Count authority record satisfied some condition
         * @public
         * @function count
         * @param {Object} authority - query condition when count authority records
         * @param {Array[String]} attributes - attributes wanted to count but just use first attribute
         * @return {Promise<Number>}
         * 0 when count error or result 0
         * number when count successed and not 0
         * @since 1.0.0
         */
        async count(authority, attributes = ['*']) {

            // format authority's attributes and query attributes
            authority = this.service.util.setTableValue(this.table, authority);
            attributes = this.service.util.setQueryAttributes(this.table, attributes);

            try {
                return await this.service.dbHelp.count('authorities', attributes[0], authority);
            } catch (err) {
                return 0;
            }
        }


        /**
         * Insert a authority record into authorities
         * @public
         * @function insert
         * @param {Object} authority - authority record waited to insert into tabe authorities
         * @return  {Promise<Boolean>}
         * true when insert authority record successed
         * false when insert authority record failed
         * @since 1.0.0
         */
        async insert(authority) {

            // format authority record's attributes
            authority = this.service.util.setTableValue(this.table, authority);

            // authority.id doesn't exist
            if (!authority.id) {
                return false;
            }

            // authority record exists
            if (await this.exists(authority.id)) {
                return false;
            }

            try {
                // insert a authority record to table authorities
                await this.service.dbHelp.insert('authorities', authority);
                return true;
            } catch (err) {
                return false;
            }
        }


        /**
         * Update info of some authorities satisfied some condition
         * @public
         * @function update
         * @param {Object} authority - authority record
         * @param {Object} wheres - query condition when update authorities
         * @return {Promise<Boolean>}
         * true when update authorities successed
         * false when update authorities failed
         */
        async update(authority, wheres = { id: authority.id }) {

            // format authority's attributes and wheres' attributes
            authority = this.service.util.setTableValue(this.table, authority);
            wheres = this.service.util.setTableValue(this.table, wheres);

            // authority doesn't exist
            if (authority.id && !await this.exists(authority.id)) {
                return false;
            }

            // authority exists
            try {
                // modify authority info
                await this.service.dbHelp.update('authorities', authority, wheres);
                return true;
            } catch (err) {
                return false;
            }
        }


        /**
         * Delete some authority records' satisfied some condition
         * @public
         * @function delete
         * @param {Object} authority - query condition when delete some authorities record
         * @return {Promise<Boolean>}
         * true when delete authorities records successed
         * false when delete authorities records failed
         * @since 1.0.0
         */
        async delete(authority) {

            // format authority's attributes
            authority = this.service.util.setTableValue(this.table, authority);

            // authority doesn't exist
            if (authority.id && !await this.exists(authority.id)) {
                return false;
            }

            try {
                // delete some authority record satisfied some condition
                await this.service.dbHelp.delete('authorities', authority);
                return true;
            } catch (err) {
                return false;
            }
        }

    }

    return Authorities;
}