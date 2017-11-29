module.exports = app => {
    class CounterUser extends app.Controller {
        
        // index test
        async index() {
            this.ctx.body = {
                code: 200,
                data: {
                    info: 'test successed'
                }
            };
        }


        // assign some counter specified by counter id to some users specified by userId
        async assignCounters() {
            
            // get userId and counterIds
            const userId = this.ctx.params.userId;
            const counters = this.ctx.request.body;

            // counter assigned flag
            let assigned = true;
            for (const counter of counters.counters) {
                if (!await this.service.counterUser.insert({ userId, counterId: counter.counterId, type: counter.type })) {
                    assigned = false;
                }

                await this.service.counters.update({ assigned: true }, { id: counter.counterId });
            }

            if (!assigned) {
                this.ctx.body = this.service.util.generateResponse(403, 'assign some counters failed');
                return;
            }

            this.ctx.body = this.service.util.generateResponse(201, 'assigned counters successed');
        }


        // retrieve some counters from some user
        async retrieveCounters() {

        }

        // retrive some users' all counters
        async oneKeyRetrive() {

            // get the users 
        }
    }

    return CounterUser;
}