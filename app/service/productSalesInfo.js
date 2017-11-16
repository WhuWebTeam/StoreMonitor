module.exports = app => {
    class ProductSalesInfo extends app.Service {

        // get default value of table productSalesInfo
        getTable() {
            const table = {
                shopId: '0000000000',
                productId: '0000000000',
                transId: '',
                ts: 0,
                price: '',
                quantity: '',
                amount: '',
            };
            return table;
        }


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

            productSaleInfo = this.service.util.setTableValue(this.getTable(), productSaleInfo);
            
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
            const str = 'select max(ts) from productSalesInfo';
            let ts = await this.app.db.query(str);
            return ts && ts[0] && ts[0].max || 0;
        }


        // query info of productSalesInfo specified by id, shopId, productId, transId, ts, price, quantity or amount
        async query(productSaleInfo) {

            productSaleInfo = this.service.util.setTableValue(this.getTable(), productSaleInfo);
            
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


        // migrate new data from bills to productSalesInfo
        async migrate() {
            const ts = await this.maxTs();

            const str = `insert into productSalesInfo(shopId, transId, productId, ts, price, quantity, amount)
                         select b.shopId, b.transId, b.productId, b.ts, b.price, b.quantity, b.amount from bills b
                         where ts > $1`;

            try {
                await this.app.db.query(str, [ts]);
                await this.service.logger.logDefault('running', 'migrate new data from bills to productSalesInfo successed')
            } catch (err) {
                await this.service.logger.logDefault('error', 'migrate new data from bills to productSalesInfo failed')
            }
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