module.exports = app => {
    class CounterUser extends app.Service {

        // constructor of class counterUser
        constructor() {
            
            // default value of table counterUser
            this.table = {
                userId: '0000000000',
                counterId: '0000000000',
                type: ''
            };
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