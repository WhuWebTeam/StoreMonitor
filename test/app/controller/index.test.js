const { app, mock, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/index.test.js', () => {
    describe('get /', () => {
        
        it('should status 302 and redirect to home page', () => {
            return app.httpRequest()
            .get('/')
            .expect(302)
        });


    });
});