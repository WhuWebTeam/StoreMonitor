module.exports = app => {
    class products extends app.Controller {
        
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
            const products = await this.service.dbHelp.query('products', ['*'], {});

            this.ctx.body = {
                code: 200,
                data: products
            };
        }

        // get info of some product specified by id or name
        async getProduct() {
            let product = this.ctx.request.body;

            // get info of product specified by id
            if (product.id) {
                product = await this.service.dbHelp.query('products', ['*'], product);
                this.ctx.body = {
                    code: 200,
                    data: product || product[0]
                };
                return;
            }

            product = await this.service.dbHelp.query('products', ['*'], product);
            this.ctx.body = {
                code: 200,
                data: product
            }
        }

        // add a new product info to database
        async addProduct() {
            const product = this.ctx.request.body;

            await this.service.dbHelp.insert('products', product);
            this.service.util.generateResponse(200, `add product successed`);
        }
    }

    return Products;
}