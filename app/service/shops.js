module.exports = app => {
    class Shops extends app.Service {

        // judge shop exists or not
        async exists(id) {
            if (await this.service.dbHelp.count('Shops', 'id', { id })) {
                return true;
            } else {
                return false;
            }
        }

        
        // insert shop record to shops
        async insert(shop) {

            // shop record exists
            if (await this.exists(shop.id)) {
                return false;
            }

            // insert shop record to shops
            await this.service.dbHelp.insert('shops', shop);
            return true;
        }

        // query shop info with condition query or not
        async query(shop) {

            // shop doesn't exist
            if (shop.id && !await this.exists(shop.id)) {
                return this.service.util.generateResponse(400, `shop doesn't exist`);
            }

            // query info of shop specified by id
            if (shop.id) {
                shop = await this.service.dbHelp.query('shops', ['*'], { id: shop.id });
                return {
                    code: 200,
                    data: shop && shop[0]
                };
            }

            // query info of shops without id attributes
            const shops = await this.service.dbHelp.query('shops', ['*'], shop);
            return {
                code: 200,
                data: shops
            };
        }
    }

    return Shops;
}