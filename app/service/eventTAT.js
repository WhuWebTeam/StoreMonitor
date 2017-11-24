

/**
 * Service class of table eventTAT
 * @class EventTAT
 * @since 1.0.0
 */
module.exports = app => {
    class EventTAT extends app.Service {

        /**
         * Constructor of class EventTAT
         * @param { Object } app - egg application
         * @constructor
         * @since 1.0.0
         */
        constructor(app) {

            // app.Service's constructor
            super(app);

            // attributes of table eventTAT
            this.table = {
                id: undefined,
                sysKey: undefined,
                type: 0,
                actionTime: undefined
            };
        }


        /**
         * Judge eventTAT exists or not
         * @public
         * @function exists
         * @param {String} sysKey - eventTAT's register number
         * @return {Promise<Boolean>}
         * true when eventTAT specified by sysKey exists
         * false when eventTAT specified by sysKey does't exist
         * @since 1.0.0
         */
        async exists(sysKey) {

            // parameter doesn't exist
            if (!this.service.util.parameterExists(sysKey)) {
                return false;
            }

            try {
                // eventTAT exists
                if (await this.service.dbHelp.count('eventTAT', 'sysKey', { sysKey })) {
                    return true;
                }

                // eventTAT doesn't exist
                return false;
            } catch (err) {
                return false;
            }
        }


        /**
         * Query info of eventTAT with condition query or not
         * @public
         * @function query
         * @param {Obejct} eventTAT - condition of table eventTAT'query
         * @param {Array[String]} attributes - array of attributes wanted to be queried
         * @return {Promise<Object>}
         * {} when query set doesn't exist
         * Object when query condition includes sysKey
         * Array[Object] when query condition without sysKey
         * @since 1.0.0
         */
        async query(eventTAT, attributes = ['*']) {

            //format eventTAT's attributes and query attributes
            eventTAT = this.service.util.setTableValue(this.table, eventTAT);
            attributes = this.service.util.setQueryAttributes(this.table, attributes);

            // eventTAT doesn't exist
            if (eventTAT.sysKey && !await this.exists(eventTAT.sysKey)) {
                return {};
            }

            try{
                // query info of eventTAT specified by sysKey
                if (eventTAT.sysKey) {
                    eventTAT = await this.service.dbHelp.query('eventTAT', attributes, { sysKey: eventTAT.sysKey });
                    return eventTAT && eventTAT[0];
                }

                // query info of eventTAT specified by attributes without sysKey
                const eventTAT = await this.service.dbHelp.query('eventTAT', attributes, eventTAT);
                return eventTAT;
            } catch (err) {
                return {};
            }
        }


        /**
         * Get the count of eventTAT' record with some condition
         * @public
         * @function count
         * @param {Object} eventTAT - query condition of table eventTAT
         * @param {Array[String]} attributes - attributes wanted to count but just use first attribute
         * @return {Promise<Number>}
         * 0 when count is 0 or query error
         * number not 0 when query successed and has value without 0
         * @since 1.0.0
         */
        async count(eventTAT, attributes = ['*']) {

            // format eventTAT's attributes and query attributes
            eventTAT = this.service.util.setTableValue(this.table, eventTAT);
            attributes = this.service.util.setQueryAttributes(this.table, attributes);

            try {
                return await this.service.dhHelp.count('eventTAT', attribute[0], eventTAT);
            } catch (err) {
                return 0;
            }
        }


        /**
         * Add a new eventTAT record to eventTAT
         * @public
         * @function insert
         * @param {Object} eventTAT - eventTAT record waited to be inserted to database
         * @return {Promise<Boolean>}
         * true when insert eventTAT record successed
         * false when insert eventTAT record failed
         * @since 1.0.0
         */
        async insert(eventTAT) {

            // format eventTAT record's attributes
            eventTAT = this.service.util.setTableValue(this.table, eventTAT);

            // eventTAT.sysKey doesn't exist
            if (!eventTAT.sysKey) {
                return false;
            }

            // eventTAT exists
            if (await this.exists(eventTAT.sysKey)) {
                return false;
            }

            try {
                // add a new eventTAT record to eventTAT
                await this.service.dbHelp.insert('eventTAT', eventTAT);
                return true;
            } catch (err) {
                return false;
            }
        }


        /**
         * Update info of eventTAT specified by query condition
         * @public
         * @function update
         * @param {Object} eventTAT - eventTAT record
         * @param {Object} wheres - query condition
         * @return {Promise<Boolean>}
         * true when update successed
         * false when update failed
         * @since 1.0.0
         */
        async update(eventTAT, wheres = { sysKey: eventTAT.sysKey }) {

            // format the eventTAT's attributes and where's attributes
            eventTAT = this.service.util.setTableValue(this.table, eventTAT);
            wheres = this.service.util.setTableValue(this.table, wheres);

            // eventTAT doesn't exist
            if (eventTAT.sysKey && !await this.exists(eventTAT.sysKey)) {
                return false;
            }

            try {
                // modify info of eventTAT specified by sysKey
                await this.service.dbHelp.update('eventTAT', eventTAT, wheres);
                return true;
            } catch (err) {
                return false;
            }
        }


        /**
         * Delete some eventTAT record satisfied some condition
         * @public
         * @function delete
         * @param {Object} eventTAT - query condition of table eventTAT
         * @return {Promise<Boolean>}
         * true when update eventTAT successed
         * false when update eventTAT failed
         * @since 1.0.0
         */
        async delete(eventTAT) {

            // format the eventTAT's attribute
            eventTAT = this.service.util.setTableValue(this.table, eventTAT);

            // eventTAT doesn't exist
            if (eventTAT.sysKey && !await this.exists(eventTAT.sysKey)) {
                return false;
            }

            try {
                await this.service.dbHelp.delete('eventTAT', eventTAT);
                return true;
            } catch (err) {
                return false;
            }
        }


        /**
         * Add a new eventTAT record to eventTAT but not check primary key
         * @public
         * @function insert
         * @param {Object} eventTAT - eventTAT record waited to be inserted to database
         * @return {Promise<Boolean>}
         * true when insert eventTAT record successed
         * false when insert eventTAT record failed
         * @since 1.0.0
         */
        async log(eventTAT) {

            // format eventTAT record's attributes
            eventTAT = this.service.util.setTableValue(this.table, eventTAT);

            // eventTAT.sysKey doesn't exist
            if (!eventTAT.sysKey) {
                return false;
            }

            try {
                // add a new eventTAT record to eventTAT
                await this.service.dbHelp.insert('eventTAT', eventTAT);
                return true;
            } catch (err) {
                return false;
            }
        }


        /**
         * log event action time with mutiply type
         * @public
         * @method eventTAT#eventLog
         * @param {String} sysKey - eventTAT record's unique id but not table's primary key
         * @param {Number} type - the event log's type
         * @return {Promise<Boolean>}
         * true when log successed
         * false when log failed
         * @since 1.0.0
         */
        async eventLog(sysKey, type) {

            // format event log to 0, 1, 2
            // 0: eventOpen log
            // 1: eventStoreLog
            // 2: eventCommitLog
            if (type !== 0 && type !== 1 && type !== 2) {
                type = 1;
            }
            
            const eventTAT = {};
            eventTAT.sysKey = sysKey;
            eventTAT.type = type;
            eventTAT.actionTime = Date.parse(new Date());

            if (eventTAT.type === 0) {
                return await this.insert(eventTAT);
            }

            return await this.log(eventTAT);
        }
    }

    return EventTAT;
}