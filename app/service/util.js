/** 
 * enclosure some common opration to util
 * @module util
 * 
 * @file StoreMonitor
 * @version 0.0.1
 */

/** util */
module.exports = app => {
    /**
     * used to complete module util's function
     * @class
     * @extends app.Serivce
     */
    class Util extends app.Service {

        /**
         * used to generate response formated by some information
         *     * request error info
         *     * request successed info
         * but doesn't include a data request
         * @param {int} code - status code 
         * @param {string} message - request information
         * @return {Object}
         * object with code >= 400 and error message when request failed
         * object with code < 400 and oprations releated to request successed
         */
        generateResponse(code, message) {
            if(code >= 400) {
                return {
                    code,
                    message
                };
            } else {
                return {
                    code,
                    info: {message}
                };
            }
        }

    }

    return Util;
}