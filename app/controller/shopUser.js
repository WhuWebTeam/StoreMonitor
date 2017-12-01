module.exports = app => {
    class ShopUser extends app.Controller {

        // index test
        async index() {
            this.ctx.body = {
                code: 200,
                data: {
                    info: 'test successed!'
                }
            };
        }

        // assigned shops to some user
        async assignedShops() {
            const user = this.ctx.params.userId;
            const shops = this.ctx.request.body;

            let assigned = true;

            for (const shop of shops.shops) {
                if (!await this.service.shopUser.insert({ userId: user, shopId: shop.shopId, type: shop.type }, 1)) {
                    assigned = false;
                }
            }

            if (!assigned) {
                this.ctx.body = this.service.util.generateResponse(403, 'assigned some shops failed');
                return;
            }

            this.ctx.body = this.service.util.generateResponse(203, 'asigned shops successed');
        }


        // retrive shops from some user
        async retriveShops() {

            const user = this.ctx.params.userId;
            const shops = this.ctx.request.body;

            let retrive = true;

            for (const shop of shops.shops) {
                if (!await this.service.shopUser.delete({ shopId: shop.shopId, userId: user })) {
                    retrive = false;
                }
            }

            if (!retrive) {
                this.ctx.body = this.service.util.generateResponse(403, 'retrive some shops failed');
                return;
            }

            this.ctx.body = this.service.util.generateResponse(200, 'retrive shops from user successed');
        }


        // retrive some user's all shop
        async oneKeyRetrive() {
            const user = this.ctx.params.userId;

            if (!await this.service.shopUser.delete({ userId: user })) {
                this.ctx.body = this.service.util.generateResponse(403, 'retrive shops failed');
                return;
            }

            this.ctx.body = this.service.util.generateResponse(203, 'retrive shops successed');
        }
    }

    return ShopUser;
}