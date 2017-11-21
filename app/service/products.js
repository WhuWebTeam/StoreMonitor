module.exports = app => {
    class Products extends app.Service {

        // default value of table products
        constructor(app) {
            
            // app.Service constructor
            super(app);
            
            // defalut value of table products
            this.table = {
                id: undefined,
                name: undefined
            };
        }


        // judge product exists or not
        async exists(id) {

            // parameter doesn't exist
            if (!this.service.util.parameterExists(id)) {
                return false;
            }

            // parameter exists
            if (await this.service.dbHelp.count('products', 'id', { id })) {
                return true;
            } else {
                return false;
            }
        }
        

        // insert a product record to products
        async insert(product) {

            product = this.service.util.setTableValue(this.getTable(), product);

            // product exists
            if (await this.exists(product.id)) {
                return false;
            }

            // insert product to products
            await this.service.dbHelp.insert('products', product);
            return true;
        }

        // query products with condition query or not
        async query(product) {

            product = this.service.util.setTableValue(this.getTable(), product);
            
            // product doesn't exist specified by product id
            if (product.id && !await this.exists(product.id)) {
                return this.service.util.generateResponse(400, `product doesn't exists`);
            }
            
            // get info of product specified by product id 
            if (product.id) {
                product = await this.service.dbHelp.query('products', ['*'], product);
                return {
                    code: 200,
                    data: product && product[0]
                };
            }
            
            // get info of products specified by other attributes
            const products = await this.service.dbHelp.query('products', ['*'], product);
            return {
                code: 200,
                data: products
            }
        }
    }

    return Products;
}