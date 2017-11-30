module.exports = app => {
    class Counters extends app.Controller {
        
        // index test
        async index() {
            this.ctx.body = {
                code: 200,
                data: {
                    info: 'test successed'
                }
            };
        }


        // get counters info assigned to some user
        async getMyCounter() {

            // get userId
            const user = this.ctx.params.userId;

            if (!await this.service.userswm.exists(user)) {
                this.ctx.body = this.service.util.generateResponse(400, `user doesn't exists`);
                return;
            }

            const str = `select c.id, shopId, c.type from counters c
                        inner join counterUser cu on c.id = cu.counterId
                        where cu.userId =  $1 order by c.id`;

            try {
                const counters = await this.app.db.query(str, [user]);
                this.ctx.body = {
                    code: 200,
                    data: counters
                };
            } catch (err) {
                this.ctx.body = this.service.util.generateResponse(400, 'get mycounter info failed');
            }
        }


        // get counters have been assigned
        async getCountersAssigned() {
            
            const counters = await this.service.counters.query({ assigned: true }, ['id', 'shopId']);

            this.ctx.body = {
                code: 200,
                data: counters
            };
        }


        // get counters haven't been assigned
        async getCountersNotAssigned() {
            const counters = await this.service.counters.query({ assigned: false }, ['id', 'shopId', 'type']);
            this.ctx.body = {
                code: 200,
                data: counters
            };
        }


        // modify info of some counter specified by id
        async modifyCounter() {
            const id = this.ctx.params.counterId;

            // counter without id attribute
            let counter = this.ctx.request.body;

            // add attribute id to counter object
            counter.id = id;

            this.ctx.body = await this.service.counters.update(counter);
        }


        // add a new counter
        async addCounter() {
            const counter = this.ctx.request.body;

            // counter exists
            if (!await this.service.counters.insert(counter)) {
                this.ctx.body = this.service.util.generateResponse(400, 'counter exists');
                return;
            }

            this.ctx.body = this.service.util.generateResponse(200, 'add counter successed');
        }
    }

    return Counters;
}