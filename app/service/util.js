module.exports = app => {
    class Util extends app.Service {

        generateResponse(code, message) {
            if(code >= 400) {
                return {
                    code,
                    info: message
                };
            } else {
                return {
                    code,
                    message
                };
            }
        }

    }

    return Util;
}