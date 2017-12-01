module.exports = app => {
    class Shops extends app.Controller {

        // index test
        async index() {
            this.ctx.body = {
                code: 200,
                data: {
                    info: 'test successed'
                }
            };
        }

        
        // get user's shop
        async getMyShops() {
            const user = this.ctx.params.userId;
            const str = `select s.id, s.name from shops s
                        inner join areas a on a.id = s.areaId
                        where a.manager = $1`;

            if (!await this.service.userswm.exists(user)) {
                this.ctx.body = this.service.util.generateResponse(400, `manager doesn't exists`);
            }

        
            try {
                const shops = await this.app.db.query(str, [user]);
                this.ctx.body = {
                    code: 200,
                    data: shops
                };
            } catch (err) {
                this.ctx.body = this.service.util.generateResponse(400, `get my shops' info failed`);
            }
        }


        // get shops not assigned
        async () {
            const str = `select s.id, s.name from shops s
                        where s.areaId in(
                            select id from areas
                            where manager is null)`;
            
            try {
                const shops = await this.app.db.query(str, []);
                this.ctx.body = {
                    code: 200,
                    data: shops
                };
            } catch (err) {
                this.ctx.body = this.service.util.generateResponse(400, `get shops not assigned failed`);
            }
        }


        // get shops assgined to some manager
        async getShopsAssigned() {
            const str = `select s.id, s.name from shops s
                        where s.areaId in(
                            select id from areas
                            where manager is not null)`;
            
            try {
                const shops = await this.app.db.query(str, []);
                this.ctx.body = {
                    code: 200,
                    data: shops
                };
            } catch (err) {
                this.ctx.body = this.service.util.generateResponse(400, `get shops assigned failed`);
            }
        }


        // assigned some shops to some manager
        async assignedShops() {

            const user = this.ctx.params.userId;
            const counters = this.ctx.request.body;
            const str  = `update shops set areaId = (
                            select max(id) from areas 
                            where manager = $1)
                        where id = $2`;

            try {
                for (const counter of counters.counters) {
                    await this.app.db.query(str, [user, counter.shopId]);
                }

                this.ctx.body = this.service.util.generateResponse(403, 'assigned shops to some manager successed');
            } catch (err) {
                this.service.util.generateResponse(403, 'assigned some shops to some manager');
            }
        }

        // retrive some shops from some user
        async retriveShops() {
            const user = this.ctx.params.userId;
            const counters = this.ctx.request.body;
            const str = `update shops set areaId = '' where id = $1`

            try {
                for (const counter of counters.counters) {
                    await this.app.db.query(str, [counter.shopId]);
                }

                this.ctx.body = this.service.util.generateResponse(403, 'retrive shops from some manager successed');
            } catch (err) {
                this.service.util.generateResponse(203, 'retrieve shops from some manager failed ')
            }
        }

        
        // retrive all shops from some user
        async oneKeyRetrive() {
            const user = this.ctx.params.userId;
            const str = `update shops set areaId = ''
                        where areaId in 
                            (select id from areas where manager = $1)`;
            try {
                await this.app.db.query(str, [user]);

                this.ctx.body = this.service.util.generateResponse(403, 'one key retrive successed');
            } catch (err) {
                this.ctx.body = this.service.util.generateResponse(403, 'one key retrive failed');
            }
        }
    }

    return Shops;
}