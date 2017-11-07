module.exports = app => {
    class Test extends app.Service {
        async print(message) {
            console.log(message);
        }
    }

    return Test;
}