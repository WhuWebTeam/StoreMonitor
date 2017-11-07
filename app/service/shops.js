module.exports = app => {
    class Shops extends app.Service {
        async exists(id) {
            if (await this.service.dbHelp.count('Shops', 'id', { id })) {
                return true;
            } else {
                return false;
            }
        }
    }

    return Shops;
}