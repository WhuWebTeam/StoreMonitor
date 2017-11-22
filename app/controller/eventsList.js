module.exports = app => {
    class EventsList extends app.Controller {
        

        // index test
        async index() {
            this.ctx.body = {
                code: 200,
                data: {
                    info: 'test successed'
                }
            };
        }


        // get count of eventsList total, unconfirmed, confirmed
        async getCount() {
            const working = await this.service.eventsList.count({ status: 0 }, ['id']);
    
            const store = await this.service.eventsList.count({ status: 1 }, ['id']);
    
            const commit = await this.service.eventsList.count({ status: 2 }, ['id']);
        
            this.ctx.body = {
                code: 200,
                data: {
                    working,
                    store,
                    commit
                }
            };
        }


        // get list of eventsList record
        async getEventList() {
            
            const status = +this.ctx.params.status || 0;
            const editResult = '';
            
            const eventsList = await this.service.eventsList.getEventList(status, editResult);
            this.ctx.body = {
                code: 200,
                data: eventsList
            };
        }

        // get statistics graph of eventsList record
        async getEventsListGraph() {
            const day = +this.ctx.params.day || 1;

            const eventsList = await this.service.eventsList.getEventsListGraph(day);
            this.ctx.body = {
                code: 200,
                data: eventsList
            };
        }

        // redirect to editPage
        async getEditPage() {
            redirect('/public/')
        }

        // get record of eventsList record
        async getLists() {
            const status = this.ctx.params.status;

            // cost 
        }

        // set editResult
        async setResult() {
            const ts = this.ctx.params.ts;
            const eventList = this.ctx.request.body;

            // eventList doesn't exist 
            if (!await this.service.eventsList.setResult(ts, eventList.editResult)) {
                this.ctx.body = this.service.util.generateResponse(400, `eventList doesn't exists`);
                return;
            }

            this.ctx.body = this.service.util.generateResponse(200, 'set eventList successed');
        }

        
        // set some eventList status to temp store
        async StoreEventsList() {
            const ts = await this.ctx.params.ts;

            // eventsList doesn't exist
            if (!await this.service.eventsList.StoreEventsList(ts)) {
                this.ctx.body = this.service.util.generateResponse(400, `eventList doesn't exist`);
            }

            // eventList edit successed
            this.ctx.body = this.service.util.generateResponse(200, 'set eventList status to temp store successed!');
        }

        
    }

    return EventsList;
}