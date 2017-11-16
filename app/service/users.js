/**
 * enclosure of some database opration releated to table user
 * @module users
 * 
 * @file StoreMonitor
 * @version 0.0.1
 */

/** users */
module.exports = app => {
    /**
     * used to complete module users's function
     * @class
     * @extends app.Service
     */
    class Users extends app.Service {


        // constructor of class Users
        constructor() {

            // default value of table users
            this.table = {
                id: '00000000000',
                userName: '',
                password: '',
                phone: '',
                email: '',
                authorityId: ''
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
            if (await this.service.dbHelp.count('users', 'id', { id })) {
                return true;
            } else {
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
            if (await this.service.dbHelp.count('users', 'id', { id, password })) {
                return true;
            } else {
                return false;
            }
        }


        // add a user record to users
        async insert(user) {

            // user exists
            if (await this.exists(user.id)) {
                return false;
            }

            await this.service.dbHelp.insert('users', user);
            return true;
        }


        // query some info of some users specified by id, userName, password, authorityId, phone, email
        async query(user) {
            
            // user doesn't exists
            if (user.id && !await this.exists(user.id)) {
                return this.service.util.generateResponse(400, `user doesn't eixst`);
            }

            // query info of some user specified by user's id
            if (user.id) {
                user = await this.service.dbHelp.query('users', ['*'], { id: user.id });
                return {
                    code: 200,
                    data: user && user[0]
                };
            }

            // query info of users specified by attributes without user's id
            const users = await this.service.dbHelp.query('users', ['*'], user);
            return {
                code: 200,
                data: users
            };
        }


        // update info of user specified by user's id
        async update(user) {

            // user doesn't exists
            if (!await this.exists(user.id)) {
                return this.service.util.generateResponse(400, `user doesn't exist`);
            }

            // update user's info
            await this.service.dbHelp.update('users', user, { id: user.id });
            return this.service.util.generateResponse(200, `modify user's info successed`);
        }


        // delete some user specified by user's id
        async delete(id) {
            
            // user doesn't exist
            if (!await this.exists(id)) {
                return false;
            }

            await this.service.dbHelp.delete('users', { id });
            return true;
        }
    }

    return Users;
}