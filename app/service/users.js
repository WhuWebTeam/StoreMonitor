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


        // /**
        //  * used to get user's level
        //  * @param {string} id - account of user
        //  * @return {Promise<int>} user's level
        //  */
        // async getUserLevel(id) {
        //     let level = await this.service.dbHelp.query('users', ['level'], { id });
        //     level = level && level[0] && level[0].level || 1;
        //     return +level;
        // }
    }

    return Users;
}