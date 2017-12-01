

/**
 * Service constructor of table shopUser
 * @class shopUser
 * @since 1.0.0
 */
module.exports = app => {
    class shopUser extends app.Service {

        /**
         * Constructor of class shopUser
         * @param {Object} app - egg application
         * @constructor
         * @since 1.0.0
         */
        constructor(app) {

            // constructor of app.Service
            super(app);

            // default value of table shopUser
            this.table = {
                id: undefined,
                userId: undefined,
                shopId: undefined,
                type: undefined
            };
        }


        /**
         * Judge shopUser exists or not throught shopId and userId
         * @param {String} userId - user's register code 
         * @param {String} shopId - counter's register id
         * @return {Promise<Boolean>}
         * true when userCounter exists
         * false when userCounter doesn't exist
         */
        async exists(userId, shopId) {

            // parameter doesn't exist
            if (!this.service.util.parameterExists(userId) || !this.service.util.parameterExists(shopId)) {
                return false;
            }

            try {
                // shopUser exists
                if (await this.service.dbHelp.count('shopUser', 'id', { shopId, userId })) {
                    return true;
                }

                // shopUser doesn't exists
                return false;
            } catch (err) {
                return false;
            }
        }


        /**
         * Judge shopUser record exists or not through shopUser's id
         * @public
         * @function existsId
         * @param {Number} id - shopUser's serial number
         * @return {Promise<Boolean>}
         * true when shopUser exists
         * false when shopUser doesn't exist
         * @since 1.0.0
         */
        async existsId(id) {

            // parameter doesn't exist
            if (!this.service.util.parameterExists(id)) {
                return false;
            }

            // parameter exists
            try {
                // shopUser exists
                if (await this.service.dbHelp.count('shopUser', 'id', { id })) {
                    return true;
                }

                // shopUser doesn't exist
                return false;
            } catch (err) {
                return false;
            }
        }


        /**
         * Query info of shopUser with condition query or not
         * @public
         * @function query
         * @param {Object} shopUser - condition when query shopUser
         * @param {Array[String]} attributes - attributes wanted to query
         * @return {Promise<Object>}
         * {} when no query result set
         * Object when query condition just includes id or (shopId and userId)
         * Array[Object] when query condition without id and (shopId and userId)
         */
        async query(shopUser, attributes = ['*']) {

            // format shopUser's attribute and query's attributes
            shopUser = this.service.util.setTableValue(this.table, shopUser);
            attributes = this.service.util.setQueryAttributes(this.table, attributes);

            // shopUser doesn't exist through eventLsit.id
            if (shopUser.id && !await this.existsId(shopUser.id)) {
                return {};
            }

            // shopUser doesn't exist through shopUser.sysKey
            if (shopUser.userId && shopUser.shopId && !await this.exists(shopUser.userId, shopUser.shopId)) {
                return {};
            }

            try {
                // query info of shopUser through shopUser's id
                if (shopUser.id) {
                    shopUser = await this.service.dbHelp.query('shopUser', attributes, { id: shopUser.id });
                    return shopUser && shopUser[0];
                }

                // query info of shopUser through shopUser's sysKey
                if (shopUser.userId && shopUser.shopId) {
                    shopUser = await this.service.dbHelp.query('shopUser', attributes, { userId: shopUser.userId, shopId: shopUser.shopId });
                    return shopUser && shopUser[0];
                }

                // query info of shopUser by attributes without id
                const shopUser = await this.service.dbHelp.query('shopUser', attributes, shopUser);
                return shopUser;
            } catch (err) {
                return {};
            }
        }


        /**
         * Count shopUser satisfied condition
         * @public
         * @function count
         * @param {Object} shopUser - condition when count shopUser records
         * @param {Array[String]} attributes - attributes wanted to count but just use the first attribute
         * @return {Promise<Number>}
         * 0 when count failed or result is 0
         * number when count successed and not 0
         * @since 1.0.0
         */
        async count(shopUser, attributes = ['*']) {

            // format shopUser's attributes and query attributes
            shopUser = this.service.util.setTableValue(this.table, shopUser);
            attributes = this.service.util.setQueryAttributes(this.table, attributes);

            try {
                return await this.service.dbHelp.count('shopUser', attributes[0], shopUser);
            } catch (err) {
                return 0;
            }
        }


        /**
         * Insert a shopUser record to shopUser
         * @public
         * @function insert
         * @param {Object} shopUser - shopUser record waited to insert into shopUser
         * @param {Object} table - judge which table to use (0: users, 1: userswm)
         * @return {Promise<Boolean>}
         * true when insert shopUser record successed
         * false when insert shopUser record failed
         * @since 1.0.0
         */
        async insert(shopUser, table) {

            // format shopUser's attributes
            shopUser = this.service.util.setTableValue(this.table, shopUser);

            // shopUser.shopId and countrUser.userId doesn't exist
            if (!shopUser.userId || !shopUser.shopId) {
                return false;
            }

            // counter doesn't exists
            if (!await this.service.shops.exists(shopUser.shopId)) {
                return false;
            }

            // user doesn't exist
            if (!table && !await this.service.users.exists(shopUser.userId)){
                return false;
            }

            if (table && !await this.service.userswm.exists(shopUser.userId)) {
                return false;
            }

            // shopUser exists
            if (await this.exists(shopUser.userId, shopUser.shopId)) {
                return false;
            }

            try {
                // insert a shopUser to shopUser
                await this.service.dbHelp.insert('shopUser', shopUser);
                return true;
            } catch (err) {
                return false;
            }
        }


        /**
         * Update shopUser satisfied some condition
         * @public
         * @function update
         * @param {Object} shopUser - shopUser record waited to update
         * @param {Object} wheres - condition when update table shopUser
         * @return {Promise<Boolean>}
         * true when update shopUser successed
         * false when update shopUser failed
         * @since 1.0.0
         */
        async update(shopUser, wheres = { shopId: shopUser.shopId, userId: shopUser.userId }) {

            // format shopUser's attributes and query attributes
            shopUser = this.service.util.setTableValue(this.table, shopUser);
            wheres = this.service.util.setTableValue(this.table, wheres);

            // shopUser doesn't exists
            if (shopUser.shopId && shopUser.userId && !await this.exists(shopUser.userId, shopUser.shopId)) {
                return false;
            }

            // update shopUser satisfied some condition
            try {
                await this.service.dbHelp.update('shopUser', shopUser, wheres);
                return true;
            } catch (err) {
                return false;
            }
        }

        
        /**
         * Delete shopUser satisfied some condition
         * @public
         * @function delete
         * @param {Object} shopUser - condition when delete shopUser
         * @return {Promise<Boolean>}
         * true when delete shopUser record successed
         * false when delete shopUser record failed
         * @since 1.0.0
         */
        async delete(shopUser) {

            // format shopUser's attributes
            shopUser = this.service.util.setTableValue(this.table, shopUser);

            // shopUser doesn't exist
            if (shopUser.userId && shopUser.shopId && !await this.exists(shopUser.userId, shopUser.shopId)) {
                return false;
            }

            try {
                await this.service.dbHelp.delete('shopUser', shopUser);
                return true;
            } catch (err) {
                return false;
            }
        }
    }

    return shopUser;
}