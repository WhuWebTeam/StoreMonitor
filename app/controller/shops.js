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
            const shop = this.ctx.request.body;

            this.ctx.body = await this.service.shops.query(shop);
        }



        async modifyShop() {
            const id = this.ctx.params.shopId;

            // shop object without id
            let shop = this.ctx.request.body;
            
            // add id to shop object
            shop.id = id;

            this.ctx.body = await this.service.shops.update(shop);
        }


        async changeShopArea() {
            const id = this.ctx.params.shopId;

            // shop object with areaId attribute only and without id
            let shop = this.ctx.request.body;

            // add id attributes to shop
            shop.id = id;

            this.ctx.body = await this.service.shops.update(shop);
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