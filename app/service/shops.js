module.exports = app => {
    class Shops extends app.Service {

        // default value of table shops
        getTable() {
            const table = {
                id: '0000000000',
                areaId: '0000000000',
                name: '',
                detailts: ''
            };
            return table;
        }
        
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

            shop = this.service.util.setTableValue(this.getTable(), shop);

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

            shop = this.service.util.setTableValue(this.getTable(), shop);
            
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


        // update info of shop specified by id
        async update(shop) {
            
            shop = this.service.util.setTableValue(this.getTable(), shop);
            
            // shop doesn't exist
            if (!await this.exists(shop.id)) {
                return this.service.util.generateResponse(400, `shop doesn't exists`);
            }


            // areaId attributes included in shop and area specified by areaId doesn't exists
            if (shop.areaId && !await this.service.areas.exists(shop.areaId)) {
                return this.service.util.generateResponse(400, `modify shop info failed with area doesn't exists`);
            }

            // modify shops info
            await this.service.dbHelp.update('shops', shop, { id: shop.id });
            return this.service.util.generateResponse(200, 'modify shop info successed');
        }
    }

    return Shops;
}