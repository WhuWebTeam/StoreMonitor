module.exports = app => {
    class Lists extends app.Service {
        async exist(tranId) {
            if (await this.service.dbHelp.count('lists', 'transId', {transId: tranId})) {
                return true;
            } else {
                return false;
            }
        }
    }

    return Lists;
}