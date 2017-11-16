module.exports = app => {
    class EventsList extends app.Controller {

        // constructor of class eventsList
        constructor() {
            this.table = {
                transId: '',
                ts: 0,
                createTime: '',
                updateTime: '',
                editResult: '',
                videoUrl: '',
                pic1Url: '',
                pic2Url: '',
                pic3Url: '',
                pic4Url: ''
            };
        }

        // judge eventsList record exists or not 
        async exists(ts) {
            if (await this.service.dbHelp.count('eventsList', 'id', { ts })) {
                return true;
            } else {
                return false;
            }
        }

        
        // judge eventsList record exists or not through eventList's id
        async existsId(id) {
            if (await this.service.dbHelp.count('eventsList', 'id', { id })) {
                return true;
            } else {
                return false;
            }
        }

        // insert a eventList record to eventsList
        async insert(eventList) {

            // eventList exists
            if (await this.exists(eventList.ts)) {
                return false;
            }

            // insert a eventList to eventsList
            await this.service.dbHelp.insert('eventsList', eventList);
            return true;
        }



        // query info of eventsList with condition query or not
        async query(eventList) {
            
            // eventList doesn't exist
            if (eventList.id && await this.existsId(eventList.id)) {
                return this.service.util.generateResponse(400, 'eventList doesn.t exist');
            }

            // query info of eventList through eventList's id
            if (eventList.id) {
                eventList = await this.service.dbHelp.query('eventsList', ['*'], { id: eventList.id });
                return {
                    code: 200,
                    data: eventList && eventList[0]
                };
            }

            // query info of eventList by attributes without id
            const evnetsList = await this.service.dbHelp.query('eventsList', ['*'], eventList);
            return {
                code: 200,
                data: eventsList
            };
        }


        // set EventList's result
        async setResult(ts, editResult) {
            
            // eventList doesn't exist
            if (!await this.exists(ts)) {
                return false;
            }

            // set eventList's editResult
            await this.service.dbHelp.update('eventsList', { editResult }, { ts });
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