module.exports = app => {
    class Authorities extends app.Service {

        // constructor of class Authority
        constructor() {

            // default value of table authorities
            this.table = {
                id: '0000000000',
                name: '',
                details: ''
            };
        }


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