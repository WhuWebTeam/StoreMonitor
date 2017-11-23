module.exports = app => {
    class EventTAT extends app.Controller {

        async index() {
            this.ctx.body = {
                code: 200,
                data: {
                    info: 'test successed'
                }
            }
        }


        async eventOpenTime() {
            const sysKey = this.ctx.params.sysKey;
            const eventTAT = {};
            eventTAT.sysKey = sysKey;
            eventTAT.type = 0;
            eventTAT.actionTime = Date.parse(new Date());
            if (!await this.service.eventTAT.insert(eventTAT)) {
                this.ctx.body = this.service.util.generateResponse(403, 'log event open time failed');
                return;
            }

            this.ctx.body = this.service.util.generateResponse(201, 'log event open time successed');
        }


        async eventStoreTime() {
            const sysKey = this.ctx.params.sysKey;
            const eventTAT = {};
            eventTAT.sysKey = sysKey;
            eventTAT.type = 1;
            eventTAT.actionTime = Date.parse(new Date());

            if (!await this.service.eventTAT.log(eventTAT)) {
                this.ctx.body = this.service.util.generateResponse(403, 'log event store time failed');
                return;
            }

            this.ctx.body = this.service.util.generateResponse(201, 'log event store time successed');
        }


        async eventCommitTime() {
            const sysKey = this.ctx.params.sysKey;
            const eventTAT = {};
            eventTAT.sysKey = sysKey;
            eventTAT.type = 2;
            eventTAT.actionTime = Date.parse(new Date());

            if (!await this.service.eventTAT.log(eventTAT)) {
                this.ctx.body = this.service.util.generateResponse(403, 'log event commit time failed');
                return;
            }

            this.ctx.body = this.service.util.generateResponse(201, 'log event commit time successed');
        }

    }

    return EventTAT;
}