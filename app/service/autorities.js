module.exports = app => {
    class Authorities extends app.Service {

        // get default value of table authorities
        setTable() {
            const table = {
                id: '0000000000',
                name: '',
                details: ''
            };
            return table;
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