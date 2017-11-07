module.exports = app => {
    class CounterUser extends app.Service {
        async exists(id) {
            if (await this.service.dbHelp.count('userCounter', 'id', { userId, counterId })) {
                return true;
            } else {
                return false;
            }
        }
    }

    return CounterUser;
}