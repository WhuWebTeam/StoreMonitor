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

        
        // get info of all shops
        async getShops() {
            this.ctx.body = await this.service.shops.query({});
        }


        // get info of shops with condition query or not
        async getShop() {
            const id = this.ctx.params.shopId;

            this.ctx.body = await this.service.shops.query(shop);
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


        // insert a new shop record to shops
        async addShop() {
            const shop = await this.ctx.request.body;

            // shop exists
            if (!await this.servcie.shops.insert(shop)) {
                this.ctx.body = this.service.util.generateResponse(400, 'shop exists');
            }

            this.ctx.body = this.service.util.generateResponse(200, 'add shop record successed');
        }
    }

    return Shops;
}