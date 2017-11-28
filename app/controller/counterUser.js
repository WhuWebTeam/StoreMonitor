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

        // get counterUsers' info
        async getCounterUsers() {
            const counterUsers = await this.service.dbHelp.query('counterUser', ['*'], {});

            this.ctx.body = {
                code: 200,
                data: counterUsers
            };
        }

        // get come counter's info specified by userId or counterId
        async getCounterUser() {
            let counterUser = this.ctx.request.body;

            // userId and counterId exists in request
            if (counterUser.userId && counterUser.counterId) {
                counterUser = await this.service.dbHelp.query('counterUser', ['*'], { userId: countUser.userId, counterId: counterUser.counterId });

                this.ctx.body = {
                    code: 200,
                    counterUser: counterUser[0]
                };
                return;
            }

            // userId exists in request
            if (counterUser.userId) {
                counterUser = await this.service.dbHelp.query('counterUser', ['*'], { userId: counterUser.userId });

                this.ctx.body = {
                    code: 200,
                    counterUser
                };
                return;
            }

            // counterId exists in request
            if (counterUser.counterId) {
                counterUser = await this.service.dbHelp.query('counterUser', ['*'], { counterId: counterUser.counterId });

                this.ctx.body = {
                    code: 200,
                    counterUser
                };
                return;
            }

            counterUser = await this.service.dbHelp.query('counterUser', ['*'], counterUser);
            this.ctx.body = {
                code: 200,
                counterUser
            };
        }

        async modifyCounterUser() {
            const type = this.ctx.request.body.type;


        }

        // assign some counter specified by counter id to some users specified by userId
        async assignCounters() {
            
            // get userId and counterIds
            const userId = this.ctx.params.userId;
            const counters = this.ctx.request.body;


            // counter assigned flag
            let assigned = true;
            for (const counter of counters.counters) {
                if (await this.service.counters.insert({ userId, counterId: counter.counterId, type: counterUser.type })) {
                    assigned = false;
                }

                await this.service.counters.update({ assigned: true }, { id: counterId });
            }

            if (!assigned) {
                this.ctx.body = this.service.util.generateResponse(403, 'assign some counters failed');
                return;
            }

            this.ctx.body = this.service.util.generateResponse(201, 'assigned counters successed');
        }


        // retrieve counter from some user
        async retrieveCounter() {
            const counterId = this.ctx.params.counterId;
            const userId = this.ctx.params.userId;

            if (!await this.service.counterUser.exists(userId, counterId)) {
                this.ctx.body = this.service.util.generateResponse(400, `assign record doesn't exist`);
                return;
            }

            await this.service.dbHelp.delete('counterUser', { counterId, userId });
            this.ctx.body = this.service.util.generateResponse(200, `retrieve counter(${counterId}) from user(${userId}) successed`);
        }
    }

    return CounterUser;
}