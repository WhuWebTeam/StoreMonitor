module.exports = app => {
    class Video extends app.Controller {

        // index test
        async index() {
            this.ctx.body = {
                code: 200,
                data: {
                    info: 'test successed'
                }
            };
        }


        // get data from DVA system
        async getDVAData() {
            const DVA = this.ctx.request.body;

            /* parse DVA data and store them to database */
            // format counter

            let counter = {};
            counter.id = DVA.RegID || '0000000000';
            counter.type = DVA.RegType || 'pos';
            counter.shopId = DVA.ShopID || '';
            if (!await this.service.counters.insert(counter)) {
                await this.service.logger.logDefault('error', `counter(${counter.id}) exists`);
            } else {
                await this.service.logger.logDefault('running', `insert counter(${counter.id}) to counters successed`);
            }

            // format shop
            let shop = {};
            shop.id = DVA.ShopID || '0000000000';
            if (!await this.service.shops.insert(shop)) {
                await this.service.logger.logDefault('error', `shop(${shop.id} exists`);
            } else {
                await this.service.logger.logDefault('running', `insert shop(${shop.id}) to shops successed`);
            }

            // format cashier
            let cashier = {};
            cashier.id = DVA.CashierID || '0000000000';
            if (!await this.service.cashiers.insert(cashier)) {
                await this.service.logger.logDefault('error', `cashier(${cashier.id}) exists`);
            } else {
                await this.service.logger.logDefault('running', `insert cashier(${cashier.id}) to cashiers successed`);
            }

            // format customer
            let customer = {};
            customer.id = DVA.CustomerID || '0000000000';
            if (!await this.service.customers.insert(customer)) {
                await this.service.logger.logDefault('error', `customer(${customer.id}) exists`);
            } else {
                await this.service.logger.logDefault('running', `insert customer(${customer.id}) to customers successed`);
            }

            for (const [index, billEle] of DVA.Bills.entries()) {

                // format product
                let product = {};
                product.id = billEle.Sku || '0000000000';
                product.name = billEle.Text || '';
                if (!await this.service.products.insert(product)) {
                    await this.service.logger.logDefault('error', `product(${product.id}) exists`);
                } else {
                    await this.service.logger.logDefault('running', `insert product(${product.id}) to products successed`);
                }


                // format bill
                let bill = {};
                bill.sysKey = DVA.ShopID + DVA.TransID + billEle.Ts || '00000000000000000000000';
                bill.price = billEle.Price || 0;
                bill.amount = billEle.Amount || 0;
                bill.quantity = bill.price * bill.amount;
                bill.ts = billEle.Ts || 0;
                bill.scriptVer = DVA.ScriptVer || '';
                bill.eventFlag = billEle.Type || 'normal';
                bill.customerId = DVA.CustomerID || '0000000000';
                bill.transId = DVA.TransID || '';
                bill.shopId = DVA.ShopID || '0000000000';
                bill.counterId = DVA.RegID || '0000000000';
                bill.productId = billEle.Sku || '0000000000';
                bill.cashierId = DVA.CashierID || '0000000000';
                if (!await this.service.bills.insert(bill)) {
                    await this.service.logger.logDefault('error', `bill(${bill}) exists`);
                } else {
                    await this.service.logger.logDefault('running', `insert bill(${bill}) to bills successed`);
                }


                // format eventList
                let eventList = {};
                eventList.sysKey = bill.sysKey;
                eventList.transId = DVA.TransID || '0000000000';
                eventList.ts = billEle.Ts || 0;
                eventList.createAt = Date.parse(new Date());
                eventList.videoUrl = billEle.VideoUrl || '';
                eventList.pic1Url = billEle.PictureUrl0 || '';
                eventList.pic2Url = billEle.PictureUrl1 || '';
                eventList.pic3Url = billEle.PictureUrl2 || '';
                eventList.pic4Url = billEle.PictureUrl3 || '';
                eventList.videoStartTime = billEle.Start || 0;
                eventList.videoEndTime = billEle.End || 0;
                eventList.productId = billEle.Sku || '0000000000';
                eventList.productName = billEle.Text || '';   
                eventList.counterId = DVA.RegID || '0000000000';
                eventList.counterType = DVA.RegType || 'pos';
                eventList.cashierId = DVA.CashierID || '0000000000';
                eventList.shopId = DVA.ShopID || '0000000000';
                if (bill.eventFlag.toLowerCase() !== 'normal' &&  await this.service.eventsList.insert(eventList)) {
                    await this.service.logger.logDefault('running', `insert bill(${eventList}) to bills successed`);
                } else if (bill.eventFlag.toLowerCase() !== 'normal') {
                    await this.service.logger.logDefault('running', `bill(${eventList}) exists`);
                }
            }

            this.ctx.body = this.service.util.generateResponse(200, 'add video record successed');
        }
    }

    return Video;
}