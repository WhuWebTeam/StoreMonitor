module.exports = app => {
    class Index extends app.Controller {
        async index() {
            this.ctx.body = {
                code: 400,
                data: 'access successful'
            };
        }

        async pgTest() {
            console.log(app.db);
            const str = 'select * from users';
            const user = await this.app.db.query(str, []);
            this.ctx.body = {
                code: 400,
                user
            };
        }
    }

    return Index;
}