module.exports = app => {
    class User extends app.Controller {

        // user index page test
        async index() {
            this.ctx.body = {
                code: 200,
                data: 'Test successful'
            }
        }


        // get users info
        async getUsers() {
            const users = await this.service.dbHelp.query('users', '*', {});
            this.ctx.body = {
                code: 400,
                data: users
            };
        }


        // get some user's info
        async getUser() {
            const id = this.ctx.params.userId;
            if (await this.service.users.exists(id)) {
                const user = await this.service.dbHelp.query('users', ['*'], { id });
                this.ctx.body = {
                    code: 400,
                    data: user[0]
                };
                return;
            }
    
            this.ctx.body = this.service.util.generateResponse(400, 'get user info failed');
        }


        // change some user's level related to priority
        async changeAuthority() {
            
            // oprate man exists or not
            const id = this.ctx.query.userId;
            if (!await this.service.users.exists(id)) {
                this.ctx.body = this.service.util.generateResponse(400, `user doesn't exists`);
                return;
            }
            

            // oprated user exists or not
            const user = this.ctx.request.body;
            if (!await this.service.users.exists(user.id)) {
                this.ctx.body = this.servicee.util.generateResponse(400, `user whose authority waited to be changed doesn't exists`);
                return;
            }

            // change authority of user specified by id 
            await this.service.dbHelp.update('users', user, { id: user.id });
            this.ctx.body = this.service.util.generateResponse(200, `change user's authority successed`);
        }


        // change some user's password
        async changePassword() {
            const id = this.ctx.params.userId;
            const password = this.ctx.request.body.password;
            
            
            // user doesn't exist
            if (!await this.service.users.exists(id)) {
                this.ctx.body = this.service.util.generateResponse(400, `user doesn't exists`);
                return;
            }

            await this.service.dbHelp.update('users', { password }, { id });
            this.ctx.body = this.service.util.generateResponse(200, 'password modify successful');                        
        }

        
        // add some user whoes priority doesn't more than oprate man's level 
        async addUser() {

            // oprate man exists or not
            const oprateMan = this.ctx.params.userId;
            if (!await this.service.users.exists(oprateMan)) {
                this.ctx.body = this.service.util.generateResponse(400, `user doesn't exists`);
                return;
            }

            // oprated user exists or not
            const user = this.ctx.request.body;
            if (await this.service.users.exists(user.id)) {
                this.ctx.body = this.service.util.generateResponse(400, `user waited to be added exists`);
                return;
            }

            // set authority to null when user's authority exists
            if (user.authorityId) {
                user.authorityId = '';
            }

            await this.service.dbHelp.insert('users', user);
            this.ctx.body = this.service.util.generateResponse(200, 'create account successful');
        }


        // some user signs in
        async signIn() {
            const user = this.ctx.request.body;

            // user exists
            if (await this.service.users.exists(user.id)) {
                const result = await this.service.users.passwordRight(user.id, user.password);
                this.ctx.body = {
                    code: 200,
                    data: {
                        result
                    }
                };
                return;
            }
        
            this.ctx.body = this.service.util.generateResponse(400, `user doesn't exists`);

            // ----------------------
        }


        // delete some user whoes level less than oprated man
        async deleteUser() {

            // oprate man exists or not
            const oprateMan = this.ctx.params.userId;
            if (!await this.service.users.exists(oprateMan)) {
                this.ctx.body = this.service.util.generateResponse(400 `user doesn't exsits`);
                return;
            }

            // oprated man exists or not
            const opratedMan = this.ctx.request.body;
            if (!await this.service.util.exists(opratedMan.id)) {
                this.ctx.body = this.service.util.generateResponse(400, `user wait to be deleted doesn't exists`);
                return;
            }

            await this.service.dbHelp.delete('users', { id: opratedMan.id });
            this.ctx.body = this.service.util.generateResponse(200, 'delete user successfully');
        }
    }

    return User;
}