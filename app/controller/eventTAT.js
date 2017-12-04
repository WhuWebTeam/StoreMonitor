

/**
 * Controller class of table eventTAT
 * @module eventTAT
 * @since 1.0.0
 */
module.exports = app => {
    class EventTAT extends app.Controller {

        /**
         * Index test
         * @public
         * @function eventTAT#index
         * @since 1.0.0
         */
        async index() {

            this.ctx.body = {
                code: 200,
                data: {
                    info: 'test successed'
                }
            }
        }


        /**
         * get manager's response time(day: 'week', 'month', '3month', '6month')
         */
        async getResponseTime() {

            const user = this.ctx.params.userId;
            const time = this.ctx.params.day;

            // set the duration time
            const values = [user];
            switch(time.toLowerCase()) {
                case 'week':
                    values.push(7);
                    break;
                case 'month':
                    values.push(30);
                    break;
                case '3month':
                    values.push(90);
                    break;
                default:
                    values.push(180);
                    break;
            }

            try {

            } catch (err) {
                
            }
        }


        /**
         * Log open event's time(type:0)
         * @public
         * @function eventTAT#eventOpenTime
         * @since 1.0.0
         */
        async eventOpenTime() {
            
            // eventTAT'S sysKey
            const sysKey = this.ctx.params.sysKey;

            if (!await this.service.eventTAT.eventLog(sysKey, 0)) {
                this.ctx.body = this.service.util.generateResponse(403, 'log event open time failed');
                return;
            }

            this.ctx.body = this.service.util.generateResponse(201, 'log event open time successed');
        }


        /**
         * Log store event's time(type:1)
         * @public
         * @function eventTAT#eventStoreTime
         * @since 1.0.0
         */
        async eventStoreTime() {

            // eventTAT's sysKey
            const sysKey = this.ctx.params.sysKey;

            if (!await this.service.eventTAT.eventLog(sysKey, 1)) {
                this.ctx.body = this.service.util.generateResponse(403, 'log event store time failed');
                return;
            }

            this.ctx.body = this.service.util.generateResponse(201, 'log event store time successed');
        }


        /**
         * Log commit event's time(type:2)
         * @public
         * @function eventTAT#eventCommitTime
         * @since 1.0.0
         */
        async eventCommitTime() {

            // eventTAT's sysKey
            const sysKey = this.ctx.params.sysKey;

            if (!await this.service.eventTAT.eventLog(sysKey, 2)) {
                this.ctx.body = this.service.util.generateResponse(403, 'log event commit time failed');
                return;
            }

            this.ctx.body = this.service.util.generateResponse(201, 'log event commit time successed');
        }


        /**
         * Log many commit events' time(type:2)
         * @public eventTAT#eventCommitTimes
         * @function
         * @since 1.0.0
         */
        async eventCommitTimes() {

            // array includes eventTAT's sysKey
            const commits = this.ctx.request.body;
            let commit = 1;

            for (const eventTAT of commits.sysArr) {
                if(!await this.service.eventTAT.eventLog(eventTAT.sysKey, 2)) {
                    commit = 0;
                };
            }

            // exists event commit log failed
            if (!commit) {
                this.ctx.body = this.service.util.generateResponse(403, 'log event commit time failed');
                return;
            }

            // all event commit log successed
            this.ctx.body = this.service.util.generateResponse(201, 'log event commit time successed');
        }
    }

    return EventTAT;
}