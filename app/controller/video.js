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
            counter.id = DVA.RegID || '0002';
            counter.type = DVA.RegType || 'pos';
            counter.shopId = DVA.ShopID || 'SP12345';
            if (!await this.service.counters.insert(counter)) {
                await this.service.logger.logDefault('running', `counter(${counter.id}) exists`);
            } else {
                await this.service.logger.logDefault('running', `insert counter(${counter.id}) to counters successed`);
            }

            // format shop
            let shop = {};
            shop.id = DVA.ShopID || 'SP12345';
            if (!await this.service.shops.insert(shop)) {
                await this.service.logger.logDefault('running', `shop(${shop.id} exists`);
            } else {
                await this.service.logger.logDefault('running', `insert shop(${shop.id}) to shops successed`);
            }

            // format cashier
            let cashier = {};
            cashier.id = DVA.CashierID || 'WM20170103';
            if (!await this.service.cashiers.insert(cashier)) {
                await this.service.logger.logDefault('running', `cashier(${cashier.id}) exists`);
            } else {
                await this.service.logger.logDefault('running', `insert cashier(${cashier.id}) to cashiers successed`);
            }

            // format customer
            let customer = {};
            customer.id = DVA.CustomerID || 'WM20170103';
            if (!await this.service.customers.insert(customer)) {
                await this.service.logger.logDefault('running', `customer(${customer.id}) exists`);
            } else {
                await this.service.logger.logDefault('running', `insert customer(${customer.id}) to customers successed`);
            }
            
            for (const [index, billEle] of DVA.Bills.entries()) {

                // format product
                let product = {};
                product.id = billEle.Sku || 'NO090934535123';
                product.name = billEle.Text || '';
                if (!await this.service.products.insert(product)) {
                    await this.service.logger.logDefault('running', `product(${product.id}) exists`);
                } else {
                    await this.service.logger.logDefault('running', `insert product(${product.id}) to products successed`);
                }

                
                // format bill
                let bill = {};
                bill.price = billEle.Price || 0;
                bill.quantity = billEle.quantity || 0;
                bill.amount = bill.price * bill.quantity;
                bill.ts = billEle.Ts || 0;
                bill.scriptVer = DVA.ScriptVer || '';
                bill.eventFlag = billEle.Type || '';
                bill.startTime = billEle.Start || 0;
                bill.endTime = billEle.End || 0;
                bill.cashierId = DVA.CashierID || 'WM20170103';
                bill.customerId = DVA.CustomerID || 'WM20170103';
                bill.transId = DVA.TransID || '6992';
                bill.shopId = DVA.ShopID || 'SP12345';
                bill.counterId = DVA.RegID || '0002';
                bill.productId = billEle.Sku || 'NO090934535123';
                if (!await this.service.bills.insert(bill)) {
                    await this.service.logger.logDefault('running', `bill(${bill}) exists`);
                } else {
                    await this.service.logger.logDefault('running', `insert bill(${bill}) to bills successed`);
                }
                

                // format eventList
                let eventList = {};
                eventList.transId = DVA.TransID || '6992';
                eventList.ts = billEle.Ts || 0;
                eventList.createAt = Date.parse(new Date());
                eventList.videoUrl = billEle.VideoUrl || '';
                eventList.pic1Url = billEle.PictureUrl0 || '';
                eventList.pic2Url = billEle.PictureUrl1 || '';
                eventList.pic3Url = billEle.PictureUrl2 || '';
                eventList.pic4Url = billEle.PictureUrl3 || '';
                eventList.editResult = '';
                eventList.comment = '';
                if (bill.eventFlag.toLowerCase() !== 'Normal' &&  await this.service.eventsList.insert(eventList)) {
                    await this.service.logger.logDefault('running', `insert bill(${eventList}) to bills successed`);
                } else if (bill.eventFlag.toLowerCase() !== 'Normal') {
                    await this.service.logger.logDefault('running', `bill(${eventList}) exists`);
                }

                // // post confirm data to DVA system
                // ctx.curl('http://www.dvs.system.url', {

                // });
            }

            this.ctx.body = this.service.util.generateResponse(200, 'add video record successed');
        }
    }

    return Video;
}