module.exports = app => {
    class WuMartUsers extends app.Service {
        async exists(wmUserId) {
            if (await this.service.dbHelp.count('userswm', 'wmUserId', { wmUserId })) {
                return true;
            } else {
                return false;
            }
        }
    }

    return WuMartUsers;
}