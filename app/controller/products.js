module.exports = app => {
    class Products extends app.Controller {
        
        // index test
        async index() {
            this.ctx.body = {
                code: 200,
                data: {
                    info: 'test successed'
                }
            }
        }


        // get info of all products
        async getProducts() {
            this.ctx.body = await this.service.products.query({});
        }


        // get info of some product specified by id or name
        async getProduct() {
            let product = this.ctx.request.body;

            this.ctx.body = await this.service.products.query(product);
        }
        

        // add a new product info to database
        async addProduct() {
            const product = this.ctx.request.body;

            // product doesn't exists
            if (!await this.service.products.insert(product)) {
                this.ctx.body = this.service.util.generateResponse(400, `product exists`);
                return;
            }

            this.ctx.body = this.service.util.generateResponse(200, 'add product successed');
        }
    }

    return Products;
}