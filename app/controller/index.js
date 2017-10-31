module.exports = app => {
    class Index extends app.Controller {
        async index() {
            this.ctx.body = {
                code: 400,
                data: 'access successful'
            };
        }

        async pgTest() {
            let sqlStr = 'select * from test';
            const result = await this.app.pg.query(str);
            this.ctx.body = {
                code: 400,
                result
            };
        }
    }

    return Index;
}