module.exports = app => {
    class Cashiers extends app.Service {
        async exists(id) {
            if (! await this.service.dbHelp.count('cashiers', 'id', { id })) {
                return true;
            } else {
                return false;
            }
        }
    }

    return Cashiers;
}