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
    }

    return Shops;
}