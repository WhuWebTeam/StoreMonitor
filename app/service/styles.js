/**
 * enclosure of database opration releated to table styles
 * @module styles
 * 
 * @file StoreMonitor
 * @version 0.0.1
 */

/** styles */
module.exports = app => {
    /**
     * used to complete module styles' function
     * @class
     */
    class Styles extends app.Service {
        
        /**
         * used to judge style specified by style exists or not
         * @public
         * @function exists
         * @param {strign} style - font style of events
         * @return {Promise<boolean}
         * true when style specified by style exists
         * false when style specified by style doesn't exist
         */
        async exists(style) {
            if (await this.service.dbHelp.count('styles', 'style', {style})) {
                return true;
            } else {
                return false;
            }
        }
    }

    return Styles;
}