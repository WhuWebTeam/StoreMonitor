module.exports = app => {
    class Users extends app.Service {

        // judge user exists or not
        async exists(userNumber) {
            if (await this.service.dbHelp.count('users', 'userNumber', {userNumber})) {
                return true;
            } else {
                return false;
            }
        }

        // judge some user's password right or not
        async passwordRight(userNubmer, password) {
            if (await this.service.dbHelp.count('users', 'userNumber', {userNumber, password})) {
                return true;
            } else {
                return false;
            }
        }

        // get some user's level
        async getUserLevel(userNumber) {
            return await this.service.dbHelp.query('users', ['level'], {userNumber});
        }
    }

    return Users;
}