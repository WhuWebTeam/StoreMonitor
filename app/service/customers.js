module.exports = app => {
    class Customers extends app.Service {
        async exists(id) {
            if (!await this.service.dbHelp.count('customers', 'id', { id })) {
                return true;
            } else {
                return false;
            }
        }
    }

    return Customers;
}