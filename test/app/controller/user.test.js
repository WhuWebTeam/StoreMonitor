const { app, mock, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/user.test.js', () => {
    describe('post /api/v1/user/signIn', () => {

        it('should status 200 and get a response body', () => {
            app.mockCsrf();
            return app.httpRequest()
            .post('post /api/v1/user/signIn')
            .type('form')
            .send({
                userNumber: '001',
                password: '001'
            })
            .expect(200);
        })
    })
})