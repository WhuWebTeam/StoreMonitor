module.exports = app => {
    class ProductSalesInfo extends app.Service {
        
        // judge productSaleInfo exists or not
        async exists(ts) {
            if (await this.service.dbHelp.count('productSalesInfo', 'id', { productId, transId, ts })) {
                return true;
            } else {
                return false;
            }
        }

        // judge productSaleInfo exists or not
        async existsId(id) {
            if (await this.service.dbHelp.count('productSalesInfo', 'id', { id })) {
                return true;
            } else {
                return false;
            }
        }


        // insert productSalesInfo queried from bills to productSalesInfo
        async insert(productSaleInfo) {
            
            // productSaleInfo exists
            if (await this.exists(productSaleInfo.ts)) {
                return false;
            }

            // add a new productSaleInfo to productSalesInfo
            await this.service.dbHelp.insert('productSalesInfo', productSalesInfo);
            return true;
        }


        // query max ts time
        async maxTs() {
            const str = 'select max(ts) from prodctSalesInfo';
            let ts = await this.app.db.query(str);
            return ts && ts[0] || 0;
        }


        // query info of productSalesInfo specified by id, shopId, productId, transId, ts, price, quantity or amount
        async query(productSaleInfo) {

            // productSaleInfo doesn't exist
            if (productSaleInfo.id && !await this.existsId(productSaleInfo.id)) {
                return this.service.util.generateResponse(400, `productSaleInfo doesn't exist`);
            }

            // query info of productSaleInfo specified by productSaleInfo's id 
            if (productSaleInfo.id) {
                productSaleInfo = await this.service.dbHelp.query('productSalesInfo', ['*'], { id: productSaleInfo.id });
                return {
                    code: 200,
                    data: productSaleInfo && productSaleInfo[0]
                };
            }

            // query info of productSaleInfo specified by attributes without productSaleInfo's id
            const productSalesInfo = await this.service.dbHelp.query('productSalesInfo', ['*'], productSaleInfo);
            return {
                code: 200,
                data: productSaleInfo
            };
        }
    }

    return ProductSalesInfo;
}




// productSaleInfo's structure
// {
//     id,
//     shopId,
//     productId,
//     transId,
//     ts,
//     price,
//     quantity,
//     amount
// }