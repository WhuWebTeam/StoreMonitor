module.exports = app => {
    class Test extends app.Service {
        print(message) {
            console.log(message);
        }
    }

    return Test;
}