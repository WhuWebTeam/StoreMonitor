module.exports = app => {
    class Index extends app.Controller {

        // home page
        async home() {
            this.ctx.redirect('/public/home.html');
        }


        // clear all  record in database
        async clear() {
            const tables = [
                'users', 'userswm', 'authorities', 'counterUser', 'counters', 'shops', 'areas', 'products', 'customers', 
                'cashiers', 'bills', 'eventsList', 'cashierSalesInfo', 'customerSalesInfo', 'productSalesInfo'
            ];
            
            tables.map(async table => {
                const str = `delete from ${table}`;

                await this.app.db.query(str);
            });

            this.ctx.body = this.service.util.generateResponse(200, 'clear database successed');
        }


        async pgTest() {
            const str = 'select * from users';
            const user = await this.app.db.query(str, []);
            this.ctx.body = {
                code: 200,
                data: user
            };
        }

        async logTest() {
            this.service.logger.logDefault('running', 'test');
            this.ctx.body = {
                code: 200,
                data: {
                    info: 'successed'
                }
            }
        }
    }

    return Index;
}