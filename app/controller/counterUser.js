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
                if (!await this.service.counterUser.insert({ userId, counterId: counter.counterId, type: counter.type }, 1)) {
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

            const userId = this.ctx.params.userId;
            const counters = this.ctx.request.body;
    
            let retrive = true;
            for (const counter of counters.counters) {
                if (!await this.service.counterUser.delete({ userId, counterId: counter.counterId }) 
                    || await this.service.counters.update({ assigned: false}, { id: counter.counterId})) {
                    retrive = false;
                }
            }

            // retrive some counter failed
            if (!retrive) {
                this.ctx.body = this.service.util.generateResponse(404, 'retrive some counter failed');
                return;
            }

            this.ctx.body = this.service.util.generateResponse(204, 'retrivw counter successed');
        }


        // retrive some users' all counters
        async oneKeyRetrive() {

            // get the user's id
            const user = this.ctx.params.userId;

            // set counters' status of this user
            let str = `update counters c set assigned = false
                        where c.id in(
                            select counterId from counterUser where userId = $1)`;

            try {
                await this.app.db.query(str, [user]);

                // retrive counters from some user
                if (!await this.service.counterUser.delete({ userId: user })) {
                    this.ctx.body = this.service.util.generateResponse(404, 'delete counterUser record failed');
                    return;
                }

                this.ctx.body = this.service.util.generateResponse(204, 'delete counterUser record successed');
            } catch (err) {
                this.ctx.body = this.service.util.generateResponse(203, 'set assigned status of counters assigned to some user failed');
            }
        }
    }

    return CounterUser;
}