module.exports = app => {
    class Index extends app.Controller {
        async index() {
            this.ctx.body = {
                code: 400,
                data: 'access successful'
            };
        }

        async pgTest() {
            const str = 'select * from users';
            const user = await this.app.db.query(str, []);
            this.ctx.body = {
                code: 400,
                user
            };
        }

        async logTest() {
            this.service.logger.logDefault('error', 'test');
            this.ctx.body = {
                code: 200,
                info: {
                    message: 'successed'
                }
            }
        }
    }

    return Index;
}