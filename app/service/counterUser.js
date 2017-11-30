

/**
 * Service constructor of table counterUser
 * @class CounterUser
 * @since 1.0.0
 */
module.exports = app => {
    class CounterUser extends app.Service {

        /**
         * Constructor of class CounterUser
         * @param {Object} app - egg application
         * @constructor
         * @since 1.0.0
         */
        constructor(app) {

            // constructor of app.Service
            super(app);

            // default value of table counterUser
            this.table = {
                id: undefined,
                userId: undefined,
                counterId: undefined,
                type: undefined
            };
        }


        /**
         * Judge counterUser exists or not throught counterId and userId
         * @param {String} userId - user's register code 
         * @param {String} counterId - counter's register id
         * @return {Promise<Boolean>}
         * true when userCounter exists
         * false when userCounter doesn't exist
         */
        async exists(userId, counterId) {

            // parameter doesn't exist
            if (!this.service.util.parameterExists(userId) || !this.service.util.parameterExists(counterId)) {
                return false;
            }

            try {
                // counterUser exists
                if (await this.service.dbHelp.count('counterUser', 'id', { counterId, userId })) {
                    return true;
                }

                // counterUser doesn't exists
                return false;
            } catch (err) {
                return false;
            }
        }


        /**
         * Judge counterUser record exists or not through counterUser's id
         * @public
         * @function existsId
         * @param {Number} id - counterUser's serial number
         * @return {Promise<Boolean>}
         * true when counterUser exists
         * false when counterUser doesn't exist
         * @since 1.0.0
         */
        async existsId(id) {

            // parameter doesn't exist
            if (!this.service.util.parameterExists(id)) {
                return false;
            }

            // parameter exists
            try {
                // counterUser exists
                if (await this.service.dbHelp.count('counterUser', 'id', { id })) {
                    return true;
                }

                // counterUser doesn't exist
                return false;
            } catch (err) {
                return false;
            }
        }


        /**
         * Query info of counterUser with condition query or not
         * @public
         * @function query
         * @param {Object} counterUser - condition when query counterUser
         * @param {Array[String]} attributes - attributes wanted to query
         * @return {Promise<Object>}
         * {} when no query result set
         * Object when query condition just includes id or (counterId and userId)
         * Array[Object] when query condition without id and (counterId and userId)
         */
        async query(counterUser, attributes = ['*']) {

            // format counterUser's attribute and query's attributes
            counterUser = this.service.util.setTableValue(this.table, counterUser);
            attributes = this.service.util.setQueryAttributes(this.table, attributes);

            // counterUser doesn't exist through eventLsit.id
            if (counterUser.id && !await this.existsId(counterUser.id)) {
                return {};
            }

            // counterUser doesn't exist through counterUser.sysKey
            if (counterUser.userId && counterUser.counterId && !await this.exists(counterUser.userId, counterUser.counterId)) {
                return {};
            }

            try {
                // query info of counterUser through counterUser's id
                if (counterUser.id) {
                    counterUser = await this.service.dbHelp.query('counterUser', attributes, { id: counterUser.id });
                    return counterUser && counterUser[0];
                }

                // query info of counterUser through counterUser's sysKey
                if (counterUser.userId && counterUser.counterId) {
                    counterUser = await this.service.dbHelp.query('counterUser', attributes, { userId: counterUser.userId, counterId: counterUser.counterId });
                    return counterUser && counterUser[0];
                }

                // query info of counterUser by attributes without id
                const counterUser = await this.service.dbHelp.query('counterUser', attributes, counterUser);
                return counterUser;
            } catch (err) {
                return {};
            }
        }


        /**
         * Count counterUser satisfied condition
         * @public
         * @function count
         * @param {Object} counterUser - condition when count counterUser records
         * @param {Array[String]} attributes - attributes wanted to count but just use the first attribute
         * @return {Promise<Number>}
         * 0 when count failed or result is 0
         * number when count successed and not 0
         * @since 1.0.0
         */
        async count(counterUser, attributes = ['*']) {

            // format counterUser's attributes and query attributes
            counterUser = this.service.util.setTableValue(this.table, counterUser);
            attributes = this.service.util.setQueryAttributes(this.table, attributes);

            try {
                return await this.service.dbHelp.count('counterUser', attributes[0], counterUser);
            } catch (err) {
                return 0;
            }
        }


        /**
         * Insert a counterUser record to counterUser
         * @public
         * @function insert
         * @param {Object} counterUser - counterUser record waited to insert into counterUser
         * @param {Object} table - judge which table to use (0: users, 1: userswm)
         * @return {Promise<Boolean>}
         * true when insert counterUser record successed
         * false when insert counterUser record failed
         * @since 1.0.0
         */
        async insert(counterUser, table) {

            // format counterUser's attributes
            counterUser = this.service.util.setTableValue(this.table, counterUser);

            // counterUser.counterId and countrUser.userId doesn't exist
            if (!counterUser.userId || !counterUser.counterId) {
                return false;
            }

            // counter doesn't exists
            if (!await this.service.counters.exists(counterUser.counterId)) {
                return false;
            }

            // user doesn't exist
            if (!table && !await this.service.users.exists(counterUser.userId)){
                return false;
            }

            if (table && !await this.service.userswm.exists(counterUser.userId)) {
                return false;
            }

            // counterUser exists
            if (await this.exists(counterUser.userId, counterUser.counterId)) {
                return false;
            }

            try {
                // insert a counterUser to counterUser
                await this.service.dbHelp.insert('counterUser', counterUser);
                return true;
            } catch (err) {
                return false;
            }
        }


        /**
         * Update counterUser satisfied some condition
         * @public
         * @function update
         * @param {Object} counterUser - counterUser record waited to update
         * @param {Object} wheres - condition when update table counterUser
         * @return {Promise<Boolean>}
         * true when update counterUser successed
         * false when update counterUser failed
         * @since 1.0.0
         */
        async update(counterUser, wheres = { counterId: counterUser.counterId, userId: counterUser.userId }) {

            // format counterUser's attributes and query attributes
            counterUser = this.service.util.setTableValue(this.table, counterUser);
            wheres = this.service.util.setTableValue(this.table, wheres);

            // counterUser doesn't exists
            if (counterUser.counterId && counterUser.userId && !await this.exists(counterUser.userId, CounterUser.counterId)) {
                return false;
            }

            // update counterUser satisfied some condition
            try {
                await this.service.dbHelp.update('counterUser', counterUser, wheres);
                return true;
            } catch (err) {
                return false;
            }
        }

        
        /**
         * Delete counterUser satisfied some condition
         * @public
         * @function delete
         * @param {Object} counterUser - condition when delete counterUser
         * @return {Promise<Boolean>}
         * true when delete counterUser record successed
         * false when delete counterUser record failed
         * @since 1.0.0
         */
        async delete(counterUser) {

            // format counterUser's attributes
            counterUser = this.service.util.setTableValue(this.table, counterUser);

            // counterUser doesn't exist
            if (counterUser.userId && counterUser.counterId && !await this.exists(counterUser.userId, counterUser.counterId)) {
                return false;
            }

            try {
                await this.service.dbHelp.delete('counterUser', counterUser);
                return true;
            } catch (err) {
                return false;
            }
        }
    }

    return CounterUser;
}