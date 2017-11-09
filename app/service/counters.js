module.exports = app => {
    class Counters extends app.Service {

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

            // counter record exists
            if (await this.exists(counter.id)) {
                return false;
            }

            // insert shop record to shops
            await this.service.dbHelp.insert('counters', counter);
            return true;
        }
    }

    return Counters;
}