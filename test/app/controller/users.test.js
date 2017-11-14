const { app, mock, assert } = require('egg-mock/bootstrap');
const should = require('should');


describe('test/app/controller/users.test.js', () => {
    describe('get /api/v1/users', () => {
        
        it('should status 200 and return an object with code 200, and data [object...]', async () => {
            const response = await app.httpRequest()
            .get('/api/v1/users')
            .expect(200);

            const body = response.body;
            // body.be.an.instanceOf(Object).and.have.property('code', 'data');
            assert.strictEqual(body.code, 200, 'response json data should be 200');
            body.data.should.be.instanceof(Array);
        });
    });


    describe('post /api/v1/users', () => {

        it('should status 200 and return an object with code 200, and data { info }', async () => {
            app.mockCsrf();
            const response = await app.httpRequest()
            .post('/api/v1/users')
            .type('form')
            .send({
                id: '10001',
                userName: 'xj',
                password: '123',
                authorityId: '',
                phone: '12345678901',
                email: '1234567890@qq.com'
            })
            .expect(200);

            const body = response.body;
            // body.be.an.instanceOf(Object).and.have.property('code', 'message');
            assert.strictEqual(body.code, 400, 'user exists and code should be 400');
        });
    });
});