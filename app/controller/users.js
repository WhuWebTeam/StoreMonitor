module.exports = app => {
    class User extends app.Controller {

        // user index page test
        async index() {
            this.ctx.body = {
                code: 200,
                data: 'test successed'
            }
        }


        // get users info
        async getUsers() {
            this.ctx.body = await this.service.users.query({});
        }


        // get some user's info
        async getUser() {
            const user = this.ctx.request.body;

            this.ctx.body = await this.service.users.query(user);
        }


        // change some user's level related to priority
        async changeAuthority() {
            
            // ..........   authority judge
            

            // modify user's authority
            const user = this.ctx.request.body;
            const result = await this.service.users.update(user);
            
            // user doesn't exist
            if (result.code >= 400) {
                this.ctx.body = result;
                return;
            }

            // modify user's authority successed
            this.ctx.body = this.service.util.generateResponse(200, `set user's priority successed`);
        }


        // change some user's password
        async changePassword() {
            
            // ..........  authority judge
           
            
            const user = this.ctx.request.body;
            const result = await this.service.users.update(user);

            // user doesn't exist
            if (result.code >= 400) {
                this.ctx.body = result;
                return;
            }

            // modify user's password successed
            this.ctx.body = this.service.util.generateResponse(200, `set user's password successed`);                       
        }


        // modify info of user's specified by user's id
        async modifyUser() {
            
            // ........... authority judge


            const user = this.ctx.request.body;

            this.ctx.body = await this.service.users.update(user);
        }


        // some user signs in
        async signIn() {
            const user = this.ctx.request.body;

            // user exists
            if (await this.service.users.exists(user.id)) {
                const password = await this.service.users.passwordRight(user.id, user.password);
                if (!password) {
                    this.ctx.body = this.service.util.generateResponse(400, 'password error');
                    return;
                }
                this.ctx.redirect('/public/users.html');
            }
        
            this.ctx.body = this.service.util.generateResponse(400, `user doesn't exists`);
        }

        
        // add a new user
        async addUser() {

            //  ............  authority judge


            const user = this.ctx.request.body;

            // user exists
            if (!await this.service.users.insert(user)) {
                this.ctx.body = this.service.util.generateResponse(400, 'user exists');
                return;
            }

            this.ctx.body = this.service.util.generateResponse(200, 'add user successed');
        }


        // delete some user whoes level less than oprated man
        async deleteUser() {

            //  ...........  authority judge


            const user = this.ctx.request.body;
            if (!await this.service.users.delete(user.id)) {
                this.ctx.body = this.service.util.generateResponse(400, `suere doesn't exist`);
                return;
            }

            this.ctx.body = this.service.util.generateResponse(200, 'delete user successed');
        }
    }

    return User;
}