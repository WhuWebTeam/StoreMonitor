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


        // get table attribute value to avoid parameter attack
        setTableValue(tableObj, paramObj) {
            Object.entries(tableObj).map(tableAttri => {
                
                // table object's attribute exists in parameter object and the value of parameter object exists
                if (paramObj[tableAttri[0]]) {
                    tableObj[tableAttri[0]] = paramObj[tableAttri[0]];
                    return;
                }
                

                // table object's attribute exists in parameter object and the value of parameter object equal to false                
                if (paramObj[tableAttri[0]] === false) {
                    tableObj[tableAttri[0]] = paramObj[tableAttri[0]];
                    return;            
                }
                
                // table object's attribute exists in parameter object and the value of parameter object equal to 0
                if (paramObj[tableAttri[0]] === 0) {
                    tableObj[tableAttri[0]] = paramObj[tableAttri[0]];
                    return;
                }
            });
        }
    }

    return Util;
}