


module.exports = app => {
    /**
     * used to complete module users's function
     * @class
     * @extends app.Service
     */
    class Users extends app.Service {

        constructor(app) {
            
            // constructor of app.Service
            super(app);
            
            // default value of table users
            const table = {
                id: undefined,
                userName: undefined,
                password: undefined,
                phone: undefined,
                email: undefined,
                authorityId: undefined
            };
        }


        /**
         * judge user exists or not
         * @public
         * @function exists
         * @param {string} id - account of user
         * @return {Promise<boolean>}
         * true when user specified by userNumber exists
         * false when user specified by userNumber doesn't exist
         */
        async exists(id) {
            
            // parameter is not exists
            if (!this.service.util.parameterExists(id)) {
                return false;
            }

            try {
                // user exists
                if (await this.service.dbHelp.count('users', 'id', { id })) {
                    return true;
                }
                
                // user doesn't exist
                return false;
            } catch (err) {
                return false;
            }
        }


        /**
         * judge some user's password right or not when user exists
         * @param {string} id - account of user 
         * @param {srting} password - user's password
         * @return {Promise<boolean>}
         * true when password of user specified by userNumber is right
         * false when password of user specified by userNumber is false 
         */
        async passwordRight(id, password) {

            // parameters don't exist
            if (!this.service.util.parameterExists(id) || !this.service.util.parameterExists(password)) {
                return false;
            }

            try {
                // password is right
                if (await this.service.dbHelp.count('users', 'id', { id, password })) {
                    return true;
                }

                // password is not right
                return false;
            } catch (err) {
                return false;
            }
        }


        // query some info of some users specified by id, userName, password, authorityId, phone, email
        async query(user, attributes = ['*']) {
            
            // format user's attributes and query attributes
            user = this.service.util.setTableValue(this.table, user);
            attributes = this.service.util.setQueryAttributes(this.table, attributes);
            
            console.log(attributes);
            // user doesn't exists
            if (user.id && !await this.exists(user.id)) {
                return {};
            }

            try {
                // query info of some user specified by user's id
                if (user.id) {
                    user = await this.service.dbHelp.query('users', attributes, { id: user.id });
                    return user && user[0];
                }

                // query info of users specified by attributes without user's id
                const users = await this.service.dbHelp.query('users', attributes, user);
                return users;
            } catch (err) {
                return {};
            }
        }


        // Get the count of users' record with some condition
        async count(user, attributes = ['*']) {

            // format user's attributes and query attributes
            area = this.service.util.setTableValue(this.table, area);
            attributes = this.service.util.setQueryAttributes(this.table, attributes);

            try {
                return await this.service.dbHelp.count('users', attributes[0], user);
            } catch (err) {
                return 0;
            }
        }

        // add a user record to users
        async insert(user) {
            
            // format user record's attributes
            user = this.service.util.setTableValue(this.table, user);
            
            // user exists
            if (await this.exists(user.id)) {
                return false;
            }
            
            try {
                // add a new user record to users
                await this.service.dbHelp.insert('users', user);
                return true;
            } catch (err) {
                return false;
            }
        }



        // update info of user specified by user's id
        async update(user, wheres = { id: user.id }) {

            // format user's attributes and query attributes 
            user = this.service.util.setTableValue(this.table, user);
            wheres = this.service.util.setQueryAttributes(this.table, wheres);
            
            // user doesn't exists
            if (!await this.exists(user.id)) {
                return false;
            }

            try {
                // update user's info
                await this.service.dbHelp.update('users', user, wheres);
                return true;
            } catch (err) {
                return false;
            }
        }


        // delete some user specified by user's id
        async delete(area) {
            
            // format the area's attributes
            area = this.service.util.setTableValue(this.table, area);


            // user doesn't exist
            if (area.id && !await this.exists(area.id)) {
                return false;
            }

            try {
                await this.service.dbHelp.delete('users', area);
                return true;
            } catch (err) {
                return false;
            }
        }
    }

    return Users;
}