module.exports = app => {
    class Index extends app.Controller {

        // home page
        async home() {
            this.ctx.redirect('/public/home.html');
        }


        
        async pgTest() {
            const str = 'select * from users';
            const user = await this.app.db.query(str, []);
            this.ctx.body = {
                code: 200,
                data: user
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