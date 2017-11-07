module.exports = app => {
    class WuMartUsers extends app.Controller {
        async index() {
            this.ctx.body = {
                code: 200,
                data: {
                    info: 'test successful'
                }
            };
        }


        async getUsers() {
            const users = await this.service.dbHelp.query('wuMartUsers', ['*'], {});
            this.ctx.body = {
                code: 200,
                data: users
            };
        }

        async getUser() {
            const wmUserId = this.ctx.params.userId;

            // user exists or not
            if (!await this.service.WuMartUsers.exists(wmUserId)) {
                this.ctx.body = this.service.util.generateResponse(400, `user doesn't exists`);
                return;
            }
            
            
            const user = await this.service.dbHelp.query('wuMartUsers', ['*'], { wmUserId });
            this.ctx.body = {
                code: 200,
                data: user[0]
            }
        }
    }

    return WuMartUsers;
}