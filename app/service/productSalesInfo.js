module.exports = app => {
    class ProductSalesInfo extends app.Service {

        // get default value of table productSalesInfo
        constructor(app) {

            // constructor of app.Service
            super(app);

            // the default value table productSalesInfo
            this.table = {
                id: undefined,
                shopId: undefined,
                productId: undefined,
                transId: undefined,
                ts: undefined,
                price: undefined,
                quantity: undefined,
                amount: undefined
            };
        }


        // judge productSaleInfo exists or not through ts
        async exists(ts) {

            // parameter doesn't exist
            if (!this.service.util.parameterExists(ts)) {
                return false;
            }

            try {
                // productSaleInfo exists
                if (await this.service.dbHelp.count('productSalesInfo', 'ts', { ts })) {
                    return true;
                }

                // productSaleInfo doesn't exist
                return false;
            } catch (err) {
                return false;
            }
        }

        // judge productSaleInfo exists or not through id
        async existsId(id) {

            // parameter doesn't exist
            if (!this.service.util.parameterExists(id)) {
                return false;
            }

            try {
                // productSaleInfo exists
                if (await this.service.dbHelp.count('productSalesInfo', 'id', { id })) {
                    return true;
                }

                // productSaleInfo doesn't exist
                return false;
            } catch (err) {
                return false;
            }
        }


        // query info of productSalesInfo satisfied some condition
        async query(productSaleInfo, attributes = ['*']) {

            // format productSaleInfo and query's attrbutes
            productSaleInfo = this.service.util.setTableValue(this.table, productSaleInfo);
            attributes = this.service.util.setQueryAttributes(this.table, attributes);
            
            // productSaleInfo doesn't exist through id
            if (productSaleInfo.id && !await this.existsId(productSaleInfo.id)) {
                return {};
            }

            // productSaleInfo doesn't exist through ts
            if (productSaleInfo.ts && !await this.exists(productSaleInfo.ts)) {
                return false;
            }

            try {
                // query info of productSaleInfo specified by productSaleInfo's id 
                if (productSaleInfo.id) {
                    productSaleInfo = await this.service.dbHelp.query('productSalesInfo', attributes, { id: productSaleInfo.id });
                    return productSaleInfo && productSaleInfo[0];
                }

                // query info of productSaleInfo specified by productSaleInfo'ts
                if (productSaleInfo.ts) {
                    productSaleInfo = await this.service.dbHelp.query('productSalesInfo', attributes, { ts: productSaleInfo.ts });
                    return productSaleInfo && productSaleInfo[0];
                }

                // query info of productSaleInfo specified by attributes without productSaleInfo's id
                const productSalesInfo = await this.service.dbHelp.query('productSalesInfo', attributes, productSaleInfo);
                return productSaleInfo;
            } catch (err) {
                return false;
            }
        }

        // Count productSaleInfo record satisfied some condition
        async count(productSaleInfo, attributes = ['*']) {

            // format productSaleInfo and query's attributes
            productSaleInfo = this.service.util.setTableValue(this.table, productSaleInfo);
            attributes = this.service.util.setQueryAttributes(this.table, attributes);

            try {
                return await this.service.dbHelp.count('productSalesInfo', attributes[0], productSaleInfo);
            } catch (err) {
                return 0;
            }
        }


        // insert productSalesInfo queried from bills to productSalesInfo
        async insert(productSaleInfo) {

            // fromat productSaleInfo record's attributes
            productSaleInfo = this.service.util.setTableValue(this.table, productSaleInfo);
            

            // productSaleInfo's ts doesn't exist
            if (!productSaleInfo.ts) {
                return false;
            }

            // productSaleInfo exists
            if (await this.exists(productSaleInfo.ts)) {
                return false;
            }

            try {
                // add a new productSaleInfo to productSalesInfo
                await this.service.dbHelp.insert('productSalesInfo', productSalesInfo);
                return true;
            } catch (err) {
                return false;
            }
        }


        // Update productSaleInfo record satisfied some condition
        async update(productSaleInfo, wheres) {

            // format productSaleInfo and query's attributes
            productSaleInfo = this.service.util.setTableValue(this.table, productSaleInfo);
            wheres = this.service.util.setTableValue(this.table, wheres);

            // productSaleInfo doesn't exist
            if (productSaleInfo.ts && !await this.exists(productSaleInfo.ts)) {
                return false;
            }

            try {
                await this.service.dbHelp.update('productSalesInfo', productSaleInfo, wheres);
                return true;
            } catch (err) {
                return false;
            }
        }


        // Delete productSaleInfo record satisfied some condition
        async delete(productSaleInfo) {

            // formate productSaleInfo's attributes
            productSaleInfo = this.service.util.setTableValue(this.table, productSaleInfo);

            // productSaleInfo doesn't exist
            if (productSaleInfo.ts && !await this.exists(productSaleInfo.ts)) {
                return false;
            }

            try {
                await this.service.dbHelp.delete('productSalesInfo', productSaleInfo);
                return true;
            } catch (err) {
                return false;
            }
        }



        // query max ts time
        async maxTs() {
            const str = 'select max(ts) from productSalesInfo';
            let ts = await this.app.db.query(str);
            return ts && ts[0] && ts[0].max || 0;
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