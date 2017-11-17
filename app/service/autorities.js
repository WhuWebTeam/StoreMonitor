module.exports = app => {
    class Authorities extends app.Service {

        // get default value of table authorities
        getTable() {
            const table = {
                id: '',
                name: '',
                details: ''
            };
            return table;
        }


        async exists(id) {

            // parameter doesn't exists
            if (!this.service.util.parameterExists(id)) {
                return false;
            }

            // parameter exists
            if (await this.service.dbHelp.count('authorities', 'id', { id })) {
                return true;
            } else {
                return false;
            }
        }
    }

    return Authorities;
}