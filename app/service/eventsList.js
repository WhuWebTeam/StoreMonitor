

/**
 * Service constructor of table eventsList
 * @class EventsList
 * @since 1.0.0
 */
module.exports = app => {
    class EventsList extends app.Controller {

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
                transId: undefined,
                ts: undefined,
                createTime: undefined,
                updateTime: undefined,
                editResult: undefined,
                videoUrl: undefined,
                status: undefined,
                pic1Url: undefined,
                pic2Url: undefined,
                pic3Url: undefined,
                pic4Url: undefined
            };
        }


        /**
         * Judge eventsList record exists or not 
         * @param {Number} ts - eventsList's occurent time 
         * @return {Promise<Boolean>}
         * truen when eventList exists
         * false when eventList doesn't exist
         * @since 1.0.0 
         */
        async exists(ts) {

            // parameter doesn't exist
            if (!this.service.util.parameterExists(ts)) {
                return false;
            }

            try {
                // eventsList exists
                if (await this.service.dbHelp.count('eventsList', 'ts', { ts })) {
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
         * @param {Object} eventList - condition when query eventsList 
         * @param {Array[String]} attributes - attributes wanted to query
         * @return {Promise<Object>}
         * {} when no query result set
         * Object when query condition just includes id or ts
         * Array[Object] when query condition without id and ts
         */
        async query(eventList, attributes = ['*']) {

            // format eventList's attribute and query's attributes
            eventList = this.service.util.setTableValue(this.table, eventList);
            attributes = this.service.util.setQueryAttributes(this.table, attributes);
            
            // eventList doesn't exist through eventLsit.id
            if (eventList.id && await this.existsId(eventList.id)) {
                return {};
            }

            // eventList doesn't exist through eventList.ts
            if (eventList.ts && await this.exists(eventList.ts)) {
                return {};
            }

            try {
                // query info of eventList through eventList's id
                if (eventList.id) {
                    eventList = await this.service.dbHelp.query('eventsList', attributes, { id: eventList.id });
                    return eventList && eventList[0];
                }

                // query info of eventList through eventList's ts
                if (eventList.ts) {
                    eventList = await this.service.dbHelp.query('eventsList', attributes, { ts: eventList.ts });
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
         * @param {Object} eventList - eventList record waited to insert into oeventsList
         * @return {Promise<Boolean>}
         * true when insert eventList record successed
         * false when insert eventList record failed
         * @since 1.0.0 
         */
        async insert(eventList) {

            // format eventList's attributes
            eventList = this.service.util.setTableValue(this.table, eventList);

            // eventList.ts doesn't exist
            if (!eventList.ts) {
                return false;
            }

            // eventList exists
            if (await this.exists(eventList.ts)) {
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
         * Update eventsList ssatisfied some condition
         * @param {Object} eventList - eventList record waited to update 
         * @param {Object} wheres - condition when update table eventsList
         * @return {Promise<Boolean>}
         * true when update eventsList successed
         * false when update eventsList failed
         * @since 1.0.0
         */
        async update(eventList, wheres = { ts: eventList.ts }) {

            // format eventList's attributes and query attributes
            eventList = this.service.util.setTableValue(this.table, eventList);
            wheres = this.service.util.setTableValue(this.table, wheres);

            // eventList doesn't exists
            if (eventList.ts && !await this.exists(eventList.ts)) {
                return false;
            }

            // update eventsList satisfied some condition
            try {
                await this.service.dbHelp.update('eventsList', eventsList, wheres);
                return true;
            } catch (err) {
                return false;
            }
        }

        /**
         * Delete EventsList satisfied some condition
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
            if (eventList.ts && !await this.exists(eventList.ts)) {
                return false;
            }

            try {
                await this.service.dbHelp.delete('eventsList', eventList);
                return true;
            } catch (err) {
                return false;
            }
        }


        // set EventList's result
        async setResult(ts, editResult) {

            // eventList doesn't exist
            if (!await this.exists(ts)) {
                return false;
            }

            // set eventList's editResult
            await this.service.dbHelp.update('eventsList', { editResult }, { ts });

            // set status to commit
            await this.service.dbHelp.update('eventsList', { status: 2 }, { ts });
            return true;
        }


        // set some EventList status to tempStore  0: default status, 1: temp store status, 2: commit status
        async StoreEventsList(ts) {
            
            // eventsList doesn't exist
            if (!await this.exists(ts)) {
                return false;
            }

            // set some eventList status to temp store
            await this.service.dbHelp.update('eventsList', { status: 1 }, { ts });
            return true;
        }
    }

    return EventsList;
}