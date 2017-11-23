module.exports = app => {
    class EventsList extends app.Controller {


        // index test
        async index() {
            this.ctx.body = {
                code: 200,
                data: {
                    info: 'test successed'
                }
            };
        }


        // get count of eventsList total, unconfirmed, confirmed
        async getCount() {
            const working = await this.service.eventsList.count({ status: 0 }, ['id']);

            const store = await this.service.eventsList.count({ status: 1 }, ['id']);

            const commit = await this.service.eventsList.count({ status: 2 }, ['id']);

            this.ctx.body = {
                code: 200,
                data: {
                    working,
                    store,
                    commit
                }
            };
        }


        // get list of eventsList record
        async getEventListByStatus() {

            const status = +this.ctx.params.status || 0;

            const eventsList = await this.service.eventsList.query({ status }, ['sysKey', 'cashierId', 'cashierName', 'counterId', 'counterType', 'transId', 'createAt', 'editResult']);
            this.ctx.body = {
                code: 200,
                data: eventsList
            };
        }



        // get list of eventsList record by status and editResult
        async getEventList() {

            const status = +this.ctx.params.status || 0;
            const editResult = this.ctx.params.result || '';

            const eventsList = await this.service.eventsList.query({ status, editResult }, ['sysKey', 'cashierId', 'cashierName', 'counterId', 'counterType', 'transId', 'createAt', 'editResult']);
            this.ctx.body = {
                code: 200,
                data: eventsList
            };
        }


        // get statistics graph of eventsList record
        async getEventsListGraph() {
            const day = this.ctx.params.day || 'day';

            const eventsList = await this.service.eventsList.getEventsListGraph(day);
            this.ctx.body = {
                code: 200,
                data: eventsList
            };
        }


        // get some event's edit info
        async getEditInfo() {

            const sysKey = this.ctx.params.sysKey;

            const eventList = await this.service.eventsList.query({ sysKey }, ['transId', 'createAt', 'editResult', 'status',
                'comments', 'videoStartTime', 'videoEndTime', 'videoUrl', 'pic1Url', 'pic2Url', 'pic3Url', 'pic4Url',
                'productId', 'productName','cashierId', 'cashierName']);
            const price = await this.service.bills.query( { sysKey }, ['price']);
            eventList.price = price && price.price;

            this.ctx.body = {
                code: 200,
                data: eventList
            };
        }


        // modify some eventList's info
        async eventEdit() {

            // sysKey and editInfo
            const sysKey = this.ctx.params.sysKey;
            const editInfo = this.ctx.request.body;

            // format eventList update info
            const eventList = {};
            eventList.editResult = editInfo.editResult;
            eventList.comments = editInfo.comments;
            eventList.productName = editInfo.productName;
            eventList.status = 1;
            console.log(eventList);
            await this.service.eventsList.update(eventList, { sysKey });

            // format bill update info
            const bill = {};
            bill.sysKey = sysKey;
            bill.price = editInfo.price;
            console.log(bill);
            await this.service.bills.update(bill, { sysKey });

            // format product update info
            const product = {};
            const productId = await this.service.bills.query({ sysKey }, ['productId']);
            product.name = editInfo.productName;
            console.log(product);
            await this.service.util.products.update( product ,{ productId: productId });
        }


        // set editResult
        async setResult() {
            const ts = this.ctx.params.ts;
            const eventList = this.ctx.request.body;

            // eventList doesn't exist
            if (!await this.service.eventsList.setResult(ts, eventList.editResult)) {
                this.ctx.body = this.service.util.generateResponse(400, `eventList doesn't exists`);
                return;
            }

            this.ctx.body = this.service.util.generateResponse(200, 'set eventList successed');
        }


        // set some eventList status to temp store
        async StoreEventsList() {
            const ts = await this.ctx.params.ts;

            // eventsList doesn't exist
            if (!await this.service.eventsList.StoreEventsList(ts)) {
                this.ctx.body = this.service.util.generateResponse(400, `eventList doesn't exist`);
            }

            // eventList edit successed
            this.ctx.body = this.service.util.generateResponse(200, 'set eventList status to temp store successed!');
        }


        // set some eventList status to temp store
        async StoreEventsList() {
            const _this = this;
            const commits = this.ctx.request.body;

            for(const eventList of commits) {
                await _this.service.eventsList.update({ status: 2 }, { sysKey: eventList.sysKey });
            };
        }
    }

    return EventsList;
}