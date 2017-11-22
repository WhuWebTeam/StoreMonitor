

/**
 * Service class of table users
 * @class Users
 * @since 1.0.0
 */
module.exports = app => {
    class Users extends app.Service {

        /**
         * Constructor of class Users
         * @param {Object} app - egg application
         * @constructor
         * @since 1.0.0
         */
        constructor(app) {

            // constructor of app.Service
            super(app);

            // default value of table users
            this.table = {
                id: undefined,
                userName: undefined,
                password: undefined,
                phone: undefined,
                email: undefined,
                authorityId: undefined
            };
        }


        /**
         * Judge user exists or not
         * @public
         * @function exists
         * @param {String} id - user's register number
         * @return {Promise<Boolean>}
         * true when user exists
         * false when user doesn't exist
         * @since 1.0.0
         */
        async exists(id) {

            // parameter is not exists
            if (!this.service.util.parameterExists(id)) {
                return false;
            }

            try {
                // user exists
                if (await this.service.dbHelp.count('users', 'id', { id })) {
                    return true;
                }

                // user doesn't exist
                return false;
            } catch (err) {
                return false;
            }
        }


        /**
         * Judge some user's password right or not when user exists
         * @public
         * @function passwordRight
         * @param {String} id - user's register number
         * @param {String} password - user's password
         * @return {Promise<Boolean>}
         * true when user's password right
         * false when user's password doesn't right
         * @since 1.0.0
         */
        async passwordRight(id, password) {

            // parameters don't exist
            if (!this.service.util.parameterExists(id) || !this.service.util.parameterExists(password)) {
                return false;
            }

            try {
                // password is right
                if (await this.service.dbHelp.count('users', 'id', { id, password })) {
                    return true;
                }

                // password is not right
                return false;
            } catch (err) {
                return false;
            }
        }


        /**
         * Query some info of some users specified by id, userName, password, authorityId, phone, email
         * @public
         * @function query
         * @param {Object} user - query condition of table users
         * @param {Array[String]} attributes - attributes wanted to query
         * @return {Promise<Object>}
         * {} when query set doesn't exist
         * Object when query condition includes id
         * Array[Object] when query condition without id
         * @since 1.0.0
         */
        async query(user, attributes = ['*']) {

            // format user's attributes and query attributes
            user = this.service.util.setTableValue(this.table, user);
            attributes = this.service.util.setQueryAttributes(this.table, attributes);

            // user doesn't exists
            if (user.id && !await this.exists(user.id)) {
                return {};
            }

            try {
                // query info of some user specified by user's id
                if (user.id) {
                    user = await this.service.dbHelp.query('users', attributes, { id: user.id });
                    return user && user[0];
                }

                // query info of users specified by attributes without user's id
                const users = await this.service.dbHelp.query('users', attributes, user);
                return users;
            } catch (err) {
                return {};
            }
        }


        /**
         * Get the count of users' record with some condition
         * @public
         * @function count
         * @param {Object} user - query condition of table users
         * @param {Array[String]} attributes - attributes wanted to count but just use first attribute
         * @return {Promise<Number>}
         * 0 when count is 0 or query error
         * number not 0 when query successed and not 0
         * @since 1.0.0
         */
        async count(user, attributes = ['*']) {

            // format user's attributes and query attributes
            area = this.service.util.setTableValue(this.table, user);
            attributes = this.service.util.setQueryAttributes(this.table, attributes);

            try {
                return await this.service.dbHelp.count('users', attributes[0], user);
            } catch (err) {
                return 0;
            }
        }


        /**
         * Add a user record to users
         * @public
         * @function insert
         * @param {Object} user - user record waited to be inserted to users
         * @return {Promise<Boolean>}
         * true when insert user record successed
         * false when insert user record failed
         * @since 1.0.0
         */
        async insert(user) {

            // format user record's attributes
            user = this.service.util.setTableValue(this.table, user);

            // user.id doesn't exist
            if (!user.id) {
                return false;
            }

            // user exists
            if (await this.exists(user.id)) {
                return false;
            }

            try {
                // add a new user record to users
                await this.service.dbHelp.insert('users', user);
                return true;
            } catch (err) {
                return false;
            }
        }


        /**
         * Update info of user specified by query condition
         * @public
         * @function update
         * @param {Object} user - user record
         * @param {Object} wheres - query condition
         * true when update successed
         * false when update failed
         * @since 1.0.0
         */
        async update(user, wheres = { id: user.id }) {

            // format user's attributes and query attributes
            user = this.service.util.setTableValue(this.table, user);
            wheres = this.service.util.setTableValue(this.table, wheres);

            // user doesn't exists
            if (user.id && !await this.exists(user.id)) {
                return false;
            }

            try {
                // update user's info
                await this.service.dbHelp.update('users', user, wheres);
                return true;
            } catch (err) {
                return false;
            }
        }


        /**
         * Delete some user specified by some condition
         * @public
         * @function delete
         * @param {Object} user - query condition of table users
         * @return {Promise<Boolean>}
         * true when delete record successed
         * false when delete record failed
         * @since 1.0.0
         */
        async delete(user) {

            // format the area's attributes
            user = this.service.util.setTableValue(this.table, user);

            // user doesn't exist
            if (user.id && !await this.exists(user.id)) {
                return false;
            }

            try {
                await this.service.dbHelp.delete('users', user);
                return true;
            } catch (err) {
                return false;
            }
        }
    }

    return Users;
}