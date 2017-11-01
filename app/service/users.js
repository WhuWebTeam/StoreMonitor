module.exports = app => {
    class Users extends app.Service {
        async exists(name) {
            if (this.service.dbHelp.count('users', 'userName', {userName: name})) {
                return true;
            } else {
                return false;
            }
        }

        
    }

    return Users;
}