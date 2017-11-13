const { app, mock, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/index.test.js', () => {
    describe('GET /', () => {
        
        it('should status 200 and get a responsde body', () => {
            return app.httpRequest()
            .get('/')
            .expect(200);
        });
    });
});