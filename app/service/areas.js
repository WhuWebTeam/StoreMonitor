module.exports = app => {
    class Areas extends app.Service {
        async existsId(id) {
            if (await this.service.dbHelp.count('areas', 'id', { id })) {
                return true;
            } else {
                return false;
            }
        }

        async existsName(name) {
            if (await this.service.dbHelp.count('areas', 'id', { name })) {
                return true;
            } else {
                return false;
            }
        }
    }

    return Areas;
}