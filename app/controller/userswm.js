module.exports = app => {
    class WuMartUsers extends app.Controller {

        // index test
        async index() {
            this.ctx.body = {
                code: 200,
                data: {
                    info: 'test successful'
                }
            };
        }


        // query all wu mei users info
        async getUsers() {
            this.ctx.body = await this.service.userswm.query({});
        }


        // query info of some wu mei users with condition query or not
        async getUser() {
            const userwm = this.ctx.request.body;

            this.ctx.body = await this.service.userswm.query(userwm);
        }
    }

    return WuMartUsers;
}