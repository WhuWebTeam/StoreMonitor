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


        }
    }

    return Shops;
}