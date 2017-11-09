module.exports = app => {
    class EventsList extends app.Controller {
        
        // judge eventsList record exists or not 
        async exists(transId, ts) {
            if (await this.service.dbHelp.count('eventsList', 'id', { transId, ts})) {
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


        // update a evetList record in eventsList
        async update(eventList) {

            // eventList doesn't exist
            if (!await this.exists(eventList.transId, eventList.ts)) {
                return false;
            }

            await this.service.dbHelp.update('eventsList', { editResult: eventList.})
        }
    }

    return EventsList;
}