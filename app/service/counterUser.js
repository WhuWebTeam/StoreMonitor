module.exports = app => {
    class CounterUser extends app.Service {
        async exists(userId, counterId) {
            if (await this.service.dbHelp.count('userCounter', 'id', { userId, counterId })) {
                return true;
            } else {
                return false;
            }
        }

        async counterAssigned() {
            if(true) {
                return true;
            } else {
                return false;
            }
        }
    }

    return CounterUser;
}