module.exports = app => {
    class Products extends app.Service {
        async exists(id) {
            if (await this.service.dbHelp.count('products', 'id', { id })) {
                return true;
            } else {
                return false;
            }
        }
    }

    return Products;
}