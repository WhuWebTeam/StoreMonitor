module.exports = app => {
    class Products extends app.Service {

        // judge product exists or not
        async exists(id) {
            if (await this.service.dbHelp.count('products', 'id', { id })) {
                return true;
            } else {
                return false;
            }
        }
        

        // insert a product record to products
        async insert(product) {
            // product exists
            if (await this.exists(product.id)) {
                return false;
            }

            // insert product to products
            await this.service.dbHelp.insert('products', product);
            return true;
        }
    }

    return Products;
}