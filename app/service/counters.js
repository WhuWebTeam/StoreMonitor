module.exports = app => {
    class Counter extends app.Service {
        async exists(id) {
            if (await this.service.dbHelp.count('counters', id, { id })) {
                return true;
            } else {
                return false;
            }
        }
    }

    return Counter;
}