module.exports = app => {
    class EventTAT extends app.Controller {

        // index test
        async index() {
            this.ctx.body = {
                code: 200,
                data: {
                    info: 'test successed'
                }
            }
        }


        // log open event's time(type:0)
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


        // log store event's time(type:1)
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


        // log commit event's time(type:2)
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


        // log many commit events' time(type:2)
        async eventCommitTimes() {
            const _this = this;
            const commits = this.ctx.request.body;

            for (const eventList of commits) {
                const eventTAT = {};
                eventTAT.sysKey = eventList.sysKey;
                eventTAT.type = 3;
                eventTAT.actionTime = Date.parse(new Date());
                await this.service.eventTAT.log(eventTAT);
            }
        }

    }

    return EventTAT;
}