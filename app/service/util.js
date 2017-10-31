module.exports = app => {
    class Util extends app.Service {

        generateResponse(code, message) {
            return {
                code,
                message
            }
        }

    }

    return Util;
}