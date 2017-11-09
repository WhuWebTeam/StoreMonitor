module.exports = app => {
    class ProductSalesInfo extends app.Service {
        
        // judge productSalesInfo exists or not
        async exists(productId, transId, ts) {
            if (await this.service.dbHelp.count('productSalesInfo', 'id', { productId, transId, ts })) {
                return true;
            } else {
                return false;
            }

        }


        // insert productSalesInfo queried from bills to productSalesInfo
        async insert() {

        }
    }

    return ProductSalesInfo;
}