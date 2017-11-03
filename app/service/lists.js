/**
 * enclosure of some database opration releated to table lists
 * @module lists
 * 
 * @file StoreMonitor
 * @version 0.0.1
 */

/** lists */
module.exports = app => {
    /**
     * used to complete module lists' function
     * @class
     * @extends app.Service
     */
    class Lists extends app.Service {

        /**
         * used to judge transaction exists or not
         * @param {string} tranId - serial number of transaction
         * @return {Promise<boolean>}
         * true when lists' record specified by tranId exists
         * flase when lists' record specified by tranId doesn't exists
         */
        async exist(tranId) {
            if (await this.service.dbHelp.count('lists', 'transId', {transId: tranId})) {
                return true;
            } else {
                return false;
            }
        }
    }

    return Lists;
}