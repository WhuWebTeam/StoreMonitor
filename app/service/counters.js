module.exports = app => {
    class Counters extends app.Service {
        async exists(id) {
            if (await this.service.dbHelp.count('counters', id, { id })) {
                return true;
            } else {
                return false;
            }
        }
    }

    return Counters;
}