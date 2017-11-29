module.exports = app => {
    class Index extends app.Controller {

        // Home page
        async home() {
            this.ctx.redirect('/public/checker.html');
        }


        // Wu mei redirect api
        async wmHome() {

            // get wu mei user's info about authority and exists or not
            const userId = this.ctx.params.userId;
            let level = await this.service.userswm.query({ wmUserId: userId }, ['wmUserLvl']);
            level = level && +level.wmuserlvl;

            // wu mei user is manager
            if (level === this.app.config.userLevel.manager) {
                
                const assigned = await this.service.counterUser.count({ userId }, ['id']);
                if (!assigned) {
                    this.ctx.redirect(`/public/checker.html?userId=${userId}`);
                    return;
                }

                this.ctx.redirect(`/public/checkout.html?userId=${userId}`);
            }

            // wu mei user is store manager
            if (level === this.app.config.userLevel.storeManager) {
                this.ctx.redirect(`/public/storeManager.html?userId=${userId}`);
                return;
            }

            // wu mei user is district manager
            this.ctx.redirect(`/public/districtManager.html?userId=${userId}`);
        }


        // Clear all  record in database
        async clear() {
            const tables = [
                'users', 'authorities', 'counterUser', 'counters', 'shops', 'areas', 'products', 'customers', 
                'cashiers', 'bills', 'eventsList', 'cashierSalesInfo', 'customerSalesInfo', 'productSalesInfo'
            ];
            
            tables.map(async table => {
                const str = `delete from ${table}`;

                await this.app.db.query(str);
            });

            this.ctx.body = this.service.util.generateResponse(200, 'clear database successed');
        }
    }

    return Index;
}