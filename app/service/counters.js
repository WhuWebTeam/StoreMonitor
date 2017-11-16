module.exports = app => {
    class Counters extends app.Service {

        // get default value of table counters
        getTable() {
            const table = {
                id: '0000000000',
                shopId: '0000000000',
                type: '',
                details: ''
            };
            return table;
        }



        // judge counter exists or not
        async exists(id) {
            if (await this.service.dbHelp.count('counters', id, { id })) {
                return true;
            } else {
                return false;
            }
        }

        
        // insert a counter into counters
        async insert(counter) {

            counter = this.service.util.setTableValue(this.getTable(), counter);

            // counter record exists
            if (await this.exists(counter.id)) {
                return false;
            }

            // insert shop record to shops
            await this.service.dbHelp.insert('counters', counter);
            return true;
        }


        // query info of counters specified by id, shopId, type or details
        async query(counter) {
            
            counter = this.service.util.setTableValue(this.getTable(), counter);
            
            // counter doesn't exist
            if (counter.id && !await this.exists(counter.id)) {
                return this.service.util.generateResponse(400, `counter doesn't exist`);
            }

            // query info of counter specified by id
            if (counter.id) {
                counter = await this.service.dbHelp.query('counters', ['*'], { id: counter.id });
                return {
                    code: 200,
                    data: counter && counter[0]
                };
            }

            // query info of some counters without id attributes
            const counters = await this.service.dbHelp.query('counters', ['*'], counter);
            return {
                code: 200,
                data: counters
            }
        }
        

        // update info of some counter specified by id
        async update(counter) {

            counter = this.service.util.setTableValue(this.getTable(), counter);
            
            // counter doesn't exist
            if (!await this.exists(counter.id)) {
                return this.service.util.generateResponse(400, `counter doesn't exist`);
            }

            // shop's id doesn't exists when shopId attribute included by counter
            if (counter.shopId && !await this.service.shops.exists(counter.shopId)) {
                return this.service.util.generateResponse(400, `modify counter info failed with shop doesn't exist`);
            }

            // modify conuter info
            await this.service.dbHelp.update('counters', counter, { id: counter.id });
            return this.service.util.generateResponse(200, `modify counter info successed`);
        }
    }

    return Counters;
}