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
            const str = `select s.id, s.name, s.type from shops s
                        inner join shopUser su on s.id = su.shopId
                        where su.userId = $1`;

            if (!await this.service.userswm.exists(user)) {
                this.ctx.body = this.servic.util.generateResponse(400, `user doesn.t exist`);
                return;
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
        async getShopsNotAssainged() {
            const str = `select s.id, s.name, s.type from shops s
                        where s.id not in
                            (select shopId from shopUser)`;
            
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
            const str = `select s.id, s.name, s.type from shops s
                        where s.id in
                            (select shopId from shopUser)`;
            
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
    }

    return Shops;
}