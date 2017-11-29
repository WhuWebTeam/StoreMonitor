

/**
 * Controller class of table eventsList
 * @module eventsList
 * @since 1.0.0
 */
module.exports = app => {
    class EventsList extends app.Controller {

        /**
         * Index test
         * @public
         * @method EventsList#index
         * @since 1.0.0
         */
        async index() {
            this.ctx.body = {
                code: 200,
                data: {
                    info: 'test successed'
                }
            };
        }


        /**
         * Get count of eventsList total, unconfirmed, confirmed
         * @public
         * @method EventsList#getCount
         * @since 1.0.0
         */
        async getCount() {

            // get user's register code
            const userId = this.ctx.params.userId;
            const during = this.app.config.time.graphShowTime;

            const str = `select count(cu.counterId)
                        from (
                            select counterId
                            from counterUser
                            where userId = $1) cu
                        inner join (
                            select counterId, status, createAt
                            from eventsList) e on e.counterId = cu.counterId
                        where e.status = $2 and to_timestamp(e.createAt) > now() - interval $3`;
                        
            try {
                let working = await this.app.db.query(str, [userId, 0, during]);
                working = working[0] && +working[0].count || 0;

                let store = await this.app.db.query(str, [userId, 1, during]);
                store = store[0] && +store[0].count || 0;

                let commit = await this.app.db.query(str, [userId, 2, during]);
                commit = commit[0] && +commit[0].count || 0;
            
                this.ctx.body = {
                    code: 200,
                    data: {
                        working,
                        store,
                        commit
                    }
                };
            } catch(err) {
                this.ctx.body = this.service.util.generateResponse(400, `get user's count statistics failed`);
            }
        }


        /**
         * Get the count of events wating to be dealed and completedthe last day
         * @public
         * @method EventsList#getDayCount
         * @since 1.0.0
         */
        async getDayCount() {

            // get count of events waiting to be dealed
            const dealing = await this.service.eventsList.count({ status: 0 }, ['id']);
            
            // get count of events completed the last day
            const str = `select count(distinct sysKey) from eventTAT where type = 2 and to_timestamp(actionTime) > now() - interval '1 d'`;

            try {
                const completed = await this.app.db.query(str, []);

                this.ctx.body = {
                    code: 200,
                    data: {
                        dealing,
                        completed
                    }
                };
            } catch(err) {
                this.ctx.body = this.service.util.generateResponse(400, 'get count statisitc of today failed');
            }
        }


        /**
         * Get rate of events occurating time during some time
         * @public
         * @method EventsList#getEventRate
         * @since 1.0.0
         */
        async getEventsRate() {

            // get the limit time duration
            const time = this.ctx.params.day;
            
            // set the duration time
            const values = [];
            switch(time.toLowerCase()) {
                case 'week':
                    values.push(7);
                    break;
                case 'month':
                    values.push(30);
                    break;
                case '3month':
                    values.push(90);
                    break;
                default:
                    values.push(180);
                    break;
            }

            try {
                // get the count of bills during the limit time 
                let str = `select count(transId) from bills where to_timestamp(ts) > now() - interval '$1 day'`;
                let bills = this.app.db.query(str, values);
                bills = bills[0] && bills[0].count || 0;

                // get the count of events during the limit time
                str = `select count(transId) from eventsList where to_timestamp(ts) > now() - interval '$1 day'`;
                let events = this.app.db.query(str, values);
                events = events[0] && events[0].count || 0;

                this.ctx.body = {
                    code: 200,
                    data: {
                        rate: events ? bills / events : 0
                    }
                }
            } catch(err) {
                this.ctx.body = this.service.util.generateResponse(400, 'get events rate failed');
            }
        } 


        /**
         * Get list of eventsList record
         * @public
         * @method EventsList#getEventListByStatus
         * @since 1.0.0
         */
        async getEventListByStatus() {

            const userId = this.ctx.params.userId;
            const status = +this.ctx.params.status || 0;
            const during = this.app.config.time.graphShowTime;

            const str = `select sysKey, cashierId, cashierName, e.counterId, counterType, transId, createAt, editResult
                        from eventsList e
                        inner join counterUser cu on cu.counterId = e.counterId
                        where cu.userId = $1 and to_timestamp(createAt) > now() - interval $2 and status = $3`;

            try {
                let eventsList = await this.app.db.query(str, [userId, during, status]);
                this.ctx.body = {
                    code: 200,
                    data: eventsList
                };
            } catch(err) {
                this.ctx.body = this.service.util.generateResponse(400, 'get info of events count in some condition failed');
            }
        }


        /**
         * Get list of eventsList record by status and editResult
         * @public
         * @method EventsList#getEventList
         * @since 1.0.0
         */
        async getEventList() {

            const status = +this.ctx.params.status || 0;
            const editResult = this.ctx.params.result || '';

            const eventsList = await this.service.eventsList.query({ status, editResult }, ['sysKey', 'cashierId', 'cashierName',
                'counterId', 'counterType', 'transId', 'createAt', 'editResult']);
            this.ctx.body = {
                code: 200,
                data: eventsList
            };
        }


        /**
         * Get statistics graph of eventsList record
         * @public
         * @method EventsList#getEventsListGraph
         * @since 1.0.0
         */
        async getEventsListGraph() {
            const day = this.ctx.params.day || 'day';

            const eventsList = await this.service.eventsList.getEventsListGraph(day);
            this.ctx.body = {
                code: 200,
                data: eventsList
            };
        }


        /**
         * Get some event's edit info
         * @public
         * @method EventsList#getEditInfo
         * @since 1.0.0
         */
        async getEditInfo() {

            const sysKey = this.ctx.params.sysKey;

            // get eventsList and price
            const eventList = await this.service.eventsList.query({ sysKey }, ['transId', 'createAt', 'editResult', 'status', 'videoUrl',
            'comments', 'productName','cashierId', 'cashierName']);
            const price = await this.service.bills.query( { sysKey }, ['price']);
            eventList.price = price && price.price || 0;

            this.ctx.body = {
                code: 200,
                data: eventList
            };
        }


        /**
         * Modify some eventList's info
         * @public
         * @method EventsList#eventEdit
         * @since 1.0.0
         */
        async eventEdit() {

            // sysKey and editInfo
            const sysKey = this.ctx.params.sysKey;
            const editInfo = this.ctx.request.body;
            let flag = 0;

            // format eventList update info
            const eventList = {};
            eventList.editResult = editInfo.editResult;
            eventList.comments = editInfo.comments;
            eventList.productName = editInfo.productName;
            eventList.status = 1;
            if (!await this.service.eventsList.update(eventList, { sysKey })) {
                flag = 1;
            }

            // format bill update info
            const bill = {};
            bill.sysKey = sysKey;
            bill.price = editInfo.price;
            if (!await this.service.bills.update(bill, { sysKey })) {
                flag = 2;
            }

            // format product update info
            const product = {};
            const productId = await this.service.bills.query({ sysKey }, ['productId']);
            product.name = editInfo.productName;
            if(!await this.service.products.update( product ,{ id: productId.productid })) {
                flag = 3;
            }

            switch(flag) {
                case 1:
                    this.ctx.body = this.service.util.generateResponse(403, 'eventsList info update failed');
                    return;
                case 2:
                    this.ctx.body = this.service.util.generateResponse(403, 'bills info update failed');
                    return;
                case 3:
                    this.ctx.body = this.service.util.generateResponse(403, 'products info update failed');
                    return;
                default:
                    this.ctx.body = this.service.util.generateResponse(201, 'edit  eventList info successed');
            };
        }


        /**
         * Commit some eventList, set its status to 2
         * @public
         * @method EventsList#commitEventList
         * @since 1.0.0
         */
        async commitEventList() {

            // eventList's sysKey
            const sysKey = this.ctx.params.sysKey;

            if (!await this.service.eventsList.update({ status: 2}, { sysKey })) {
                this.ctx.body = this.service.util.generateResponse(403, 'commit eventList failed');
                return;
            }

            this.ctx.body = this.service.util.generateResponse(201, 'commit eventList successed');
        }


        /**
         * Store some eventList, set its status to 1
         * @public
         * @method EventsList#storeEventList
         * @since 1.0.0
         */
        async storeEventList() {

            // eventList's sysKey
            const sysKey = this.ctx.params.sysKey;

            if (!await this.service.eventsList.update( {status: 1 }, { sysKey })) {
                this.ctx.body = this.service.util.generateResponse(403, 'store eventList failed');
                return;
            }

            this.ctx.body = this.service.util.generateResponse(201, 'store eventsList successed');
        }


        /**
         * Commit some eventsList, set their status to 2
         * @public
         * @method EventsList#commitEventsList
         * @since 1.0.0
         */
        async commitEventsList() {

            // array includes eventsList's sysKey
            const eventsList = this.ctx.request.body;

            // commit successed flag
            let commit = 1;

            for (const eventList of eventsList.sysArr) {
                if (!await this.service.eventsList.update({ status: 2 }, { sysKey: eventList.sysKey })) {
                    commit = 0;
                }
            }

            if (!commit) {
                this.ctx.body = this.service.util.generateResponse(403, 'commit some eventList failed');
                return;
            }

            this.ctx.body = this.service.util.generateResponse(201, 'commit eventsList successed');
        }


        /**
         * Store some eventsList, set their status to 1
         * @public
         * @method EventsList#StoreEventsList
         * @since 1.0.0
         */
        async StoreEventsList() {

            // array includes eventsList's sysKey
            const eventsList = this.ctx.request.body;

            // store successed flag
            let store = 1;

            for (const eventList of eventsList) {
                if (!await this.service.eventsList.update({ status: 1 }, { sysKey: eventList.sysKey })) {
                    store = 0;
                }
            }

            if (!store) {
                this.ctx.body = this.service.util.generateResponse(403, 'store some eventList failed');
                return;
            }

            this.ctx.body = this.service.util.generateResponse(201, 'store eventsList successed');
        }
    }

    return EventsList;
}
