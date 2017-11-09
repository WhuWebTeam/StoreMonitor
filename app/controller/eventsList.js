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

        // set editResult
        async setResult() {

            const eventList = this.ctx.request.body;

            if (!await this.service.eventsList.setResult(eventList.transId, eventList.ts, eventList.editResult)) {
                this.ctx.body = this.service.util.generateResponse(400, `eventList doesn't exists`);
                return;
            }

            this.ctx.body = this.service.util.generateResponse(200, 'set eventList successed');
        }
    }

    return EventsList;
}