

/**
 * Service class of table userswm
 * @class Userswm
 * @since 1.0.0
 */
module.exports = app => {
    class WuMartUsers extends app.Service {

        /**
         * Constructor of class Userswm
         * @param {Object} app - egg application
         * @constructor
         * @since 1.0.0
         */
        constructor(app) {

            // constructor of app.Service
            super(app);

            // default value of table userswm
            this.table = {
                wmUserId: undefined,
                wmUserLvl: undefined,
                userName: undefined,
                phone: undefined,
                email: undefined,
                authorityId: undefined
            };
        }


        /**
         * Judge user of wu mei market exists or not
         * @public
         * @function exists
         * @param {String} wmUserId - userwm's register code
         * @return {Promise<Boolean>}
         * true when userwm exists
         * false when userwm doesn't exist
         * @since 1.0.0
         */
        async exists(wmUserId) {

            // parameter doesn't exist
            if (!this.service.util.parameterExists(wmUserId)) {
                return false;
            }

            try {
                // userwm exists
                if (await this.service.dbHelp.count('userswm', 'wmUserId', { wmUserId })) {
                    return true;
                }

                // userwm doesn't exist
                return false;
            } catch (err) {
                return false;
            }
        }


        /**
         * Query info of some wu mei users specified by wmUserId, wmUserLvl, authorityId, name, phone or email
         * @public
         * @function query
         * @param {Object} userwm - query condition of table userswm
         * @param {Array[String]} attributes - attributes wanted to query
         * @return {Promise<Object>}
         * {} when query set doesn't exist
         * Object when query condition includes wmUserId
         * Array[Object] when query condition without attributes wmUserId
         * @since 1.0.0
         */
        async query(userwm, attributes = ['*']) {

            // format userwm's attributes and query attributes
            userwm = this.service.util.setTableValue(this.table, userwm);
            attributes = this.service.util.setQueryAttributes(this.table, attributes);

            // user doesn't exist
            if (userwm.wmUserId && !await this.exists(userwm.wmUserId)) {
                return {};
            }

            try {
                // query info of wu mei user specified by wmUserId
                if (userwm.wmUserId) {
                    userwm = await this.service.dbHelp.query('userswm', attributes, { wmUserId: userwm.wmUserId });
                    return userwm && userwm[0];
                }

                // query info of wu mei users specified by attributes without wmUserId
                const userswm = await this.service.dbHelp.query('userswm', ['*'], userwm);
                return userswm;
            } catch (err) {
                return {};
            }
        }


        /**
         * Get count of userwms' record with some condition
         * @public
         * @function count
         * @param {Object} userwm -  query condition of table userswm
         * @param {*} attributes -attributes wanted to count but just use first attribute
         * @return {Promise<Number>}
         * 0 when conut is 0 or query error
         * number not 0 when query successed and not 0
         * @since 1.0.0
         */
        async count(userwm, attributes = ['*']) {

            // formate userwm's attributes and query attributes
            userwm = this.service.util.setTableValue(this.table, userwm);
            attributes = this.service.util.setQueryAttributes(this.table, attributes);

            try {
                return await this.service.dbHelp.count('userswm', attributes[0], userwm);
            } catch (err) {
                return 0;
            }
        }


        /**
         * Insert wu mei user record to userswm
         * @public
         * @function insert
         * @param {Object} userwm - userwm record waited to insert into userswm
         * @return {Promsie<Boolean>}
         * true when insert userwm record successed
         * false when insert userwm record failed
         * @since 1.0.0
         */
        async insert(userwm) {

            // format userwm record's attributes
            userwm = this.service.util.setTableValue(this.table, userwm);

            // userwm.wmUserId doesn't exist
            if (!userwm.wmUserId) {
                return false;
            }

            // user exists
            if (await this.exists(userwm.wmUserId)) {
                return false;
            }

            try {
                // add a user record to userswm
                await this.service.dbHelp.insert('userswm', userwm);
                return true;
            } catch (err) {
                return false;
            }
        }


        /**
         * Update info of userwm specified by query condition
         * @public
         * @function update
         * @param {Object} userwm - userwm record
         * @param {Object} wheres - query condition
         * @return {Promise<Boolean>}
         * true when update record successed
         * false when update record failed
         * @since 1.0.0
         */
        async update(userwm, wheres = { id: user.id }) {

            // format userwm's attributes and query attributes
            userwm = this.util.setTableValue(this.table, userwm);
            wheres = this.util.setTableValue(this.table, wheres);

            // userwm doesn't exist
            if (userwm.wmUserId && !await this.exists(userwm.wmUserId)) {
                return false;
            }

            try {
                // update userwm's info
                await this.service.dbHelp.update('userswm', userwm, wheres);
                return true;
            } catch (err) {
                return false;
            }
        }


        /**
         * Delete some userwm specified by some condition
         * @public
         * @function delete
         * @param {Object} userwm - query condition
         * @return {Promise<Boolean>}
         *  true when delete record successed
         *  false when delete record failed
         *  @since 1.0.0
         */
        async delete(userwm) {

            // format userwm's attributes
            userwm = this.service.util.setTableValue(this.table, userwm);

            // userwm doesn't exist
            if (userwm.wmUserId && !await this.exists(userwm.wmUserId)) {
                return false;
            }

            try {
                await this.service.dbHelp.delete('userswm', userwm);
                return true;
            } catch (err) {
                return false;
            }
        }
    }

    return WuMartUsers;
}