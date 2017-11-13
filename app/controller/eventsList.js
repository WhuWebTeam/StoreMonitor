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



        // get info of all eventList
        async getEventsList() {
            this.ctx.body = await this.service.eventsList.query({});
        }


        // set editResult
        async setResult() {
            const ts = this.ctx.params.ts;
            const eventList = this.ctx.request.body;

            // eventList 
            if (!await this.service.eventsList.setResult(ts, eventList.editResult)) {
                this.ctx.body = this.service.util.generateResponse(400, `eventList doesn't exists`);
                return;
            }

            this.ctx.body = this.service.util.generateResponse(200, 'set eventList successed');
        }

        
        // get info of eventsList with condition query or not
        async getEventList() {
            const eventList = this.ctx.request.body;

            this.ctx.body= await this.service.eventsList.query(eventList);
        }

        
    }

    return EventsList;
}