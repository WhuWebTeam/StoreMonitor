

/**
 * Service constructor of table eventsList
 * @class EventsList
 * @since 1.0.0
 */
module.exports = app => {
    class EventsList extends app.Service {

        /**
         * Constructor of class eventsList
         * @param {Object} app - egg application
         * @constructor
         * @since 1.0.0
         */
        constructor(app) {

            // constructor of app.Service
            super(app);

            // default value of table eventsList
            this.table = {
                id: undefined,
                sysKey: undefined,
                transId: undefined,
                ts: undefined,
                createAt: undefined,
                editResult: undefined,
                status: undefined,
                comments: undefined,
                videoStartTime: undefined,
                videoEndTime: undefined,
                videoUrl: undefined,
                productId: undefined,
                productName: undefined,
                counterId: undefined,
                counterType: undefined,
                cashierId: undefined,
                cashierName: undefined,
                pic1Url: undefined,
                pic2Url: undefined,
                pic3Url: undefined,
                pic4Url: undefined,
                shopId: undefined
            };
        }


        /**
         * Judge eventsList record exists or not
         * @public
         * @function exists
         * @param {Number} sysKey - eventsList's occurent time
         * @return {Promise<Boolean>}
         * truen when eventList exists
         * false when eventList doesn't exist
         * @since 1.0.0
         */
        async exists(sysKey) {

            // parameter doesn't exist
            if (!this.service.util.parameterExists(sysKey)) {
                return false;
            }

            try {
                // eventsList exists
                if (await this.service.dbHelp.count('eventsList', 'sysKey', { sysKey })) {
                    return true;
                }

                // eventsList doesn't exists
                return false;
            } catch (err) {
                return false;
            }
        }


        /**
         * Judge eventsList record exists or not through eventList's id
         * @public
         * @function existsId
         * @param {Number} id - eventsList's serial number
         * @return {Promise<Boolean>}
         * true when eventList exists
         * false when eventList doesn't exist
         * @since 1.0.0
         */
        async existsId(id) {

            // parameter doesn't exist
            if (!this.service.util.parameterExists(id)) {
                return false;
            }

            // parameter exists
            try {
                // eventList exists
                if (await this.service.dbHelp.count('eventsList', 'id', { id })) {
                    return true;
                }

                // eventList doesn't exist
                return false;
            } catch (err) {
                return false;
            }
        }


        /**
         * Query info of eventsList with condition query or not
         * @public
         * @function query
         * @param {Object} eventList - condition when query eventsList
         * @param {Array[String]} attributes - attributes wanted to query
         * @return {Promise<Object>}
         * {} when no query result set
         * Object when query condition just includes id or sysKey
         * Array[Object] when query condition without id and sysKey
         */
        async query(eventList, attributes = ['*']) {

            // format eventList's attribute and query's attributes
            eventList = this.service.util.setTableValue(this.table, eventList);
            attributes = this.service.util.setQueryAttributes(this.table, attributes);

            // eventList doesn't exist through eventLsit.id
            if (eventList.id && !await this.existsId(eventList.id)) {
                return {};
            }

            // eventList doesn't exist through eventList.sysKey
            if (eventList.sysKey && !await this.exists(eventList.sysKey)) {
                return {};
            }

            try {
                // query info of eventList through eventList's id
                if (eventList.id) {
                    eventList = await this.service.dbHelp.query('eventsList', attributes, { id: eventList.id });
                    return eventList && eventList[0];
                }

                // query info of eventList through eventList's sysKey
                if (eventList.sysKey) {
                    eventList = await this.service.dbHelp.query('eventsList', attributes, { sysKey: eventList.sysKey });
                    return eventList && eventList[0];
                }

                // query info of eventList by attributes without id
                const eventsList = await this.service.dbHelp.query('eventsList', attributes, eventList);
                return eventsList;
            } catch (err) {
                return {};
            }
        }


        /**
         * Count eventsList satisfied condition
         * @public
         * @function count
         * @param {Object} eventList - condition when count eventsList records
         * @param {Array[String]} attributes - attributes wanted to count but just use the first attribute
         * @return {Promise<Number>}
         * 0 when count failed or result is 0
         * number when count successed and not 0
         * @since 1.0.0
         */
        async count(eventList, attributes = ['*']) {

            // format eventList's attributes and query attributes
            eventList = this.service.util.setTableValue(this.table, eventList);
            attributes = this.service.util.setQueryAttributes(this.table, attributes);

            try {
                return await this.service.dbHelp.count('eventsList', attributes[0], eventList);
            } catch (err) {
                return 0;
            }
        }


        /**
         * Insert a eventList record to eventsList
         * @public
         * @function insert
         * @param {Object} eventList - eventList record waited to insert into oeventsList
         * @return {Promise<Boolean>}
         * true when insert eventList record successed
         * false when insert eventList record failed
         * @since 1.0.0
         */
        async insert(eventList) {

            // format eventList's attributes
            eventList = this.service.util.setTableValue(this.table, eventList);


            // eventList.sysKey doesn't exist
            if (!eventList.sysKey) {
                return false;
            }

            // eventList exists
            if (await this.exists(eventList.sysKey)) {
                return false;
            }

            try {
                // insert a eventList to eventsList
                await this.service.dbHelp.insert('eventsList', eventList);
                return true;
            } catch (err) {
                return false;
            }
        }


        /**
         * Update eventsList satisfied some condition
         * @public
         * @function update
         * @param {Object} eventList - eventList record waited to update
         * @param {Object} wheres - condition when update table eventsList
         * @return {Promise<Boolean>}
         * true when update eventsList successed
         * false when update eventsList failed
         * @since 1.0.0
         */
        async update(eventList, wheres = { sysKey: eventList.sysKey }) {

            // format eventList's attributes and query attributes
            eventList = this.service.util.setTableValue(this.table, eventList);
            wheres = this.service.util.setTableValue(this.table, wheres);

            // eventList doesn't exists
            if (eventList.sysKey && !await this.exists(eventList.sysKey)) {
                return false;
            }

            // update eventsList satisfied some condition
            try {
                await this.service.dbHelp.update('eventsList', eventList, wheres);
                return true;
            } catch (err) {
                return false;
            }
        }

        
        /**
         * Delete EventsList satisfied some condition
         * @public
         * @function delete
         * @param {Object} eventList - condition when delete eventsList
         * @return {Promise<Boolean>}
         * true when delete eventsList record successed
         * false when delete eventsList record failed
         * @since 1.0.0
         */
        async delete(eventList) {

            // format eventList's attributes
            eventList = this.service.util.setTableValue(this.table, eventList);

            // eventList doesn't exist
            if (eventList.sysKey && !await this.exists(eventList.sysKey)) {
                return false;
            }

            try {
                await this.service.dbHelp.delete('eventsList', eventList);
                return true;
            } catch (err) {
                return false;
            }
        }


        // get statistics graph of eventsList record
        async getEventsListGraph(day) {
            let str = `select to_char(to_timestamp(ts/1000), $1) as t, count(id) from eventsList group by t order by t desc`;
            let values = [];

            switch(day.toLowerCase()) {
                case 'day':
                    values.push('YYYY-MM-DD');
                    break;
                case 'month':
                    values.push('YYYY-MM');
                    break;
                default:
                    str = `select count(transId), to_char(to_timestamp(ts/1000), 'YYYYMM') y, to_char(to_timestamp(ts/1000), 'W') w from eventsList
                    group by y, w
                    order by y, w`;
                    break;
            }

            try {
                const eventsList = await this.app.db.query(str, values);
                return eventsList;
            } catch(err) {
                return [];
            }
        }
    }

    return EventsList;
}