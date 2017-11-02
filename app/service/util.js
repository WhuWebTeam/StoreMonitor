module.exports = app => {
    class Util extends app.Service {


        // used to generate response
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