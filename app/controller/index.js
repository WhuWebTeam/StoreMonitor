module.exports = app => {
    class Index extends app.Controller {
        async index() {
            this.ctx.body = {
                code: 200,
                data: {
                    info: 'access successful'
                }
            };
        }

        async pgTest() {
            const str = 'select * from users';
            const user = await this.app.db.query(str, []);
            this.ctx.body = {
                code: 200,
                user
            };
        }

        async logTest() {
            this.service.logger.logDefault('running', 'test');
            this.ctx.body = {
                code: 200,
                data: {
                    info: 'successed'
                }
            }
        }
    }

    return Index;
}