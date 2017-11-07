module.exports = app => {
    class Authorities extends app.Service {
        async exists(id) {
            if (await this.service.dbHelp.count('authorities', 'id', { id })) {
                return true;
            } else {
                return false;
            }
        }
    }

    return Authorities;
}