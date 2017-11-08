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

        // get info of counters
        async getCounters() {
            const counters = await this.service.dbHelp.query('counters', ['*'], {});
            this.ctx.body = {
                code: 200,
                data: counters
            };
        }

        // get info of some counter specified by id
        async getCounter() {
            const id = this.ctx.params.counterId;

            if (!await this.service.counters.exists(id)) {
                this.ctx.body = this.service.util.generateResponse(400, `counter doesn't exists`);
                return;
            }

            const counter = await this.service.dbHelp.query('counters', ['*'], { id });
            this.ctx.body = {
                code: 200,
                data: counter[0]
            };
        }


        // get counters have been assigned
        async getCountersAssigned() {
            
            const sqlStr = `select *
                            from counters c
                            where c.id in (
                                select cu.counterId
                                from counterUser cu)`;

            const counters = await this.app.db.query(sqlStr, []);
            this.ctx.body = {
                code: 200,
                data: counters
            };
        }

        // get counters haven't been assigned
        async getCountersNotAssigned() {
            const sqlStr = `select *
                            from counters c
                            where c.id not in (
                                select cu.counterId
                                from counterUser cu)`;

            const counters = await this.app.db.query(sqlStr, []);
            this.ctx.body = {
                code: 200,
                data: counters
            };
        }

        // modify info of some counter specified by id
        async modifyCounter() {
            const id = this.ctx.params.counterId;

            if (!await this.service.counters.exists(id)) {
                this.ctx.body = this.service.util.generateResponse(400, `counter  doesn't exists`);
                return;
            }

            const counter = this.ctx.request.body;

            // modify info refer to shopsId
            if (counter.shopId && !await this.service.shops.exists(counter.shopId)) {
                this.ctx.body = this.service.util.generateResponse(400, `shop wanted to be bind doesn't exist`);
                return;
            }

            await this.service.dbHelp.update('counters', counter, { id });
            this.ctx.body = this.service.util.generateResponse(200, 'modify counter info successed');
        }

        // add a new counter
        async addCounter() {
            const counter = this.ctx.request.body;

            if (await this.service.counters.exists(counter.id)) {
                this.ctx.body = this.service.util.generateResponse(400, 'counter exists');
                return;
            }

            await this.service.dbHelp.insert('counters', counter);
            this.ctx.body = this.service.util.generateResponse(200, 'add counter successed');
        }
    }

    return Counters;
}