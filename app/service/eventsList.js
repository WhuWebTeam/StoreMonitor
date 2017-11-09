module.exports = app => {
    class EventsList extends app.Controller {

        // judge eventsList record exists or not 
        async exists(transId, ts) {
            if (await this.service.dbHelp.count('eventsList', 'id', { transId, ts })) {
                return true;
            } else {
                return false;
            }
        }

        
        // insert a eventList record to eventsList
        async insert(eventList) {

            // eventList exists
            if (await this.exists(eventList.transId, eventList.ts)) {
                return false;
            }

            // insert a eventList to eventsList
            await this.service.dbHelp.insert('eventsList', eventList);
            return true;
        }


        // set EventList's result
        async setResult(transId, ts, editResult) {
            // eventList doesn't exist
            if (!await this.exists(transId, ts)) {
                return false;
            }

            // set eventList's editResult
            await this.service.dbHelp.update('eventsList', { editResult }, { transId, ts });
            return true;
        }
    }

    return EventsList;
}