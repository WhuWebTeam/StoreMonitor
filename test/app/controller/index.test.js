const { app, mock, assert } = require('egg-mock/bootstrap');

describe('test/app.controller/index.test.js', () => {
    
    it('should get a response object with code 200', () => {
        return app.httpRequest()
        .get('/')
        .expect(200);
    });
});