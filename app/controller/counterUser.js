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

        // assign some counter specified by counter id to some user specified by userId
        async assignCounter() {
            const counterUser = this.ctx.request.body;

            // userId doesn't exists
            if (!await this.service.users.exists(counterUser.userId)) {
                this.ctx.body = this.service.util.generateResponse(400, `staff doesn't exists`);
                return;
            }

            // counter doesn't exists
            if (!await this.service.counters.exists(counterUser.counterId)) {
                ths.ctx.body = this.service.util.generateResponse(400, `counter doesn't exists`);
                return;
            }

            // counter has been assaigned 
            if (!await this.service.counterUser.counterAssigned(counterId)) {
                this.ctx.body = this.service.util.generateResponse(400, 'conuter has benn assigned');
                return;
            }


            await this.service.dbHelp.insert('counterUser', counterUser);
            this.ctx.body = this.service.generateResponse(200, `assign counter(${counterUser.counterId}) to user(${counterUser.userId}) successed`);
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