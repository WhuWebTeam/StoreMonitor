module.exports = app => {
    class CounterUser extends app.Service {

        // get default value of table counterUser
        getTable() {
            const table = {
                userId: '',
                counterId: '',
                type: ''
            };
            return table;
        }


        // counterUser exists or not
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