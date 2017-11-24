
module.exports = app => {

    class Util extends app.Service {

        // used to generate response formated by some information

        generateResponse(code, message) {
            if(code >= 400) {
                return {
                    code,
                    message
                };
            } else {
                return {
                    code,
                    data: { info: message }
                };
            }
        }


        // get table attribute value to avoid parameter attack
        setTableValue(tableObj, paramObj) {
            
            // parameter paramObj is not an object or cann't convert to object
            if (!paramObj) {
                return;
            }

            const obj = {};
            Object.entries(tableObj).map(tableAttri => {

                // table object's attribute exists in parameter object and the value of parameter object exists
                if (paramObj[tableAttri[0]]) {
                    obj[tableAttri[0]] = paramObj[tableAttri[0]];
                    return;
                }


                // table object's attribute exists in parameter object and the value of parameter object equal to false
                if (paramObj[tableAttri[0]] === false) {
                    obj[tableAttri[0]] = paramObj[tableAttri[0]];
                    return;
                }

                // table object's attribute exists in parameter object and the value of parameter object equal to 0
                if (paramObj[tableAttri[0]] === 0) {
                    obj[tableAttri[0]] = paramObj[tableAttri[0]];
                    return;
                }
            });
            return obj;
        }


        setQueryAttributes(tableObj, paramAttri) {

            // the attributes queried is just include '*'
            if (paramAttri.length === 1 && paramAttri[0] === '*') {
                return paramAttri;
            }

            // the attributes queried is just include 'max()'
            if (paramAttri.length === 1 && paramAttri[0].includes('max')) {
                return paramAttri;
            }

            // the attributes queried is just include 'min()'
            if (paramAttri.length === 1 && paramAttri[0].includes('min')) {
                return paramAttri;
            }

            // the attribute queried include more than one attribute
            const attributes = [];
            const tableAttri = Object.keys(tableObj);
            paramAttri.map(ele => {
                if (tableAttri.includes(ele)) {
                    attributes.push(ele);
                }
            });
            
            if (attributes.length !== 0) {
                return attributes;
            }

            return ['*'];
        }

        
        // validate parameter is whitespace or not
        parameterExists(param) {
            
            // parameter doesn't exist
            if (param === '' || param === null || param == undefined) {
                return false;
            }
            
            // parameter exists
            return true;
            
        }
    }

    return Util;
}