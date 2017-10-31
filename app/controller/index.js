module.exports = app => {
    class Index extends app.Controller {
        async index() {
            this.ctx.body = {
                code: 400,
                data: 'access successful'
            };
        }

        async pgTest() {
            Console.log(1);
            const sqlStr = 'select * from user';
            const user = await this.app.pg.query(str);
            this.ctx.body = {
                code: 400,
                user
            };
        }
    }

    return Index;
}