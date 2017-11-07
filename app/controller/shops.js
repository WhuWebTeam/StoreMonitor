module.exports = app => {
    class Shops extends app.Controller {
        async index() {
            this.ctx.body = {
                code: 200,
                data: {
                    info: 'test successed'
                }
            };
        }

        async getShops() {
            const shops = await this.service.dbHelp.query('shops', ['*'], {});

            this.ctx.body = {
                code: 200,
                data: shops
            };
        }

        async getShop() {
            const id = this.ctx.params.shopId;

            // shops exists or not
            if (!await this.service.shops.exists(id)) {
                this.ctx.body = this.service.util.generateResponse(400, `shop whose id is ${id} doesn't exists`);
                return;
            }

            const shop = await this.service.dbHelp.query('shops', ['*'], { id });
            this.ctx.body = {
                code: 200,
                data: shops[0]
            };
        }

        async modifyShop() {
            const id = this.ctx.params.shopId;
            
            // shops exists or not
            if(!await this.service.shops.exists(id)) {
                this.ctx.body = this.service.util.generateResponse(400, `shop doesn't exists`);
                return;
            }

            const shop = this.ctx.request.body;
            await this.service.dbHelp.update('shops', shop, { id });
            this.ctx.body = this.service.util.generateResponse(200, 'modify shop info successed');
        }


        async changeShopArea() {
            const id = this.ctx.params.shopId;

            // shop exists or not
            if(!await this.service.shops.exists(id)) {
                this.ctx.body = this.service.util.generateResponse(400, `shop doesn't exists`);
                return;
            }

            // area exists or not
            const areaId = this.ctx.request.body.areaId;
            if (!await this.service.areas.existsId(areaId)) {
                this.ctx.body = this.service.generateResponse(400, `area doesn't exist`);
                return;
            }

            await this.service.dbHelp.update('shops', { areaId }, { id });
            this.ctx.body = this.service.util.generateResponse(200, `shop's position modify successed`);
        }

        async addShop() {
            const shop = await this.ctx.request.body;

            if (await this.service.shops.exists(shop.id)) {
                this.ctx.body = await this.service.util.generateResponse(400, 'shop exists');
                return;
            }

            await this.service.dbHelp.insert('shops', shop);
            this.ctx.body = this.service.util.generateResponse(200, 'add shop successed');
        }
    }

    return Shops;
}