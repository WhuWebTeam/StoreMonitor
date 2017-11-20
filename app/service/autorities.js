module.exports = app => {
    class Authorities extends app.Service {

        
        constructor(app) {

            // app.Service's constructor
            super(app);
            
            // default value of table authorities
            this.table = {
                id: undefined,
                name: undefined,
                details: undefined
            };
        }


        // Judge authority exists or not
        async exists(id) {

            // parameter doesn't exists
            if (!this.service.util.parameterExists(id)) {
                return false;
            }

            try {
                // authority exists
                if (await this.service.dbHelp.count('authorities', 'id', { id })) {
                    return true;
                } 

                // authority doesn't exist
                return false;
            } catch (err) {
                return false;
            }
        }


        // // Query info of authorities with condition query or not
        // async query(authority, attributes = ['*']) {

        //     // format authority's attributes and query attributes
        //     authority = this.service.util.setTableValue(this.table, authority);
        //     attributes = this.service.util.setQueryAttributes(this.table, attributes);

        //     // authoritir
        // }

    }

    return Authorities;
}