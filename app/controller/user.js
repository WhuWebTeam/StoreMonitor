module.exports = app => {
    class User extends app.Controller {

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
            const userNumber = this.ctx.params.userId;
            if (await this.service.users.exists(userNumber)) {
                const user = await this.service.dbHelp.query('users', ['*'], {userNumber});
                this.ctx.body = {
                    code: 400,
                    data: user
                };
            }
    
            this.ctx.body = this.service.util.generateResponse(400, 'get user info failed');
        }


        // change some user's level related to priority
        async changeLevel() {
            
            // oprate man's info
            const oprateMan = this.ctx.query.userId;
            const oprateLevel = await this.ctx.users.getUserLevel(oprateMan);
            
            // info of man whoes level is oprated
            const opratedMan = this.ctx.request.body;
            const opratedLevel = await this.ctx.users.getUserLevel(opratedMan.userNumber);
            
            if (await this.ctx.service.users.exists(oprateMan)) {
                this.ctx.body = this.service.util.generateResponse(400, `user doesn't exists`);
            }

            // oprate man's level < oprated man's level
            if (+oprateLevel < +opratedLevel) {
                this.ctx.body = this.service.util.generateResponse(400, `you don't have the priority`);
            }

            // oprate man's level > level will be modified to
            if (+opratedLevel > +opratedMan.level) {
                this.ctx.body = this.service.util.generateResponse(400, 'priority modified to more than you priority')
            }
            
            await this.service.dbHelp.update('users', {level: opratedMan.level}, {userNumber: opratedMan.userNumber});
            this.ctx.body = this.service.generateResponse(200, 'level modify successfully');
        }


        // change some user's password
        async changePassword() {
            const userNumber = this.ctx.params.userId;
            const password = this.ctx.request.body.password;
            if (await this.service.user.exists(userNumber)) {
                await this.service.dbHelp.update('users', {password}, {userNumber});
            }

            this.ctx.body = this.service.util.generateResponse(200, 'password modify successful');
        }

        
        // add some user whoes priority doesn't more than oprate man's level 
        async addUser() {

            // oprate man's info
            const oprateMan = this.ctx.params.userId;
            const oprateLevel = await this.service.users.getUserLevel(oprateMan);

            // info of user to be added
            const user = this.ctx.request.body;

            // level to be setted higher than oprate man's level
            if (+oprateLevel < user.level) {
                this.ctx.body = this.service.users.generateResponse(400, `you don't have the priority to set someone's priority more than you`);
            }

            await this.service.dbHelp.insert('users', user);
            this.ctx.body = this.service.util.generateResponse(200, 'create account successful');
        }


        // some user signs in
        async signIn() {
            const user = this.ctx.request.body;

            // user exists
            if (await this.service.users.exists(user.userNumber)) {
                const result = await this.service.users.passwordRight(user.usernumber, user.password);
                this.ctx.body = {
                    code: 200,
                    data: {
                        result
                    }
                };
            }
        
            this.ctx.body = this.service.util.generateResponse(400, `user doesn't exists`);
        }        


        // delete some user whoes level less than oprated man
        async deleteUser() {

            // oprate man's info
            const oprateMan = this.ctx.params.userId;
            const oprateLevel = await this.service.users.getUserLevel(oprateMan);

            // info of man to be deleted
            const opratedMan = this.ctx.request.body;
            const opratedLevel = await this.service.users.getUserLevel(opratedMan.userNumber);

            if (+oprateLevel <= opratedLevel) {
                this.ctx.body = this.service.util.generateResponse(400, `you don't have the priority to delete user whoes priority don't less than you`);
            }

            await this.service.dbHelp.delete('users', {userNumber: opratedMan.userNumber});
            this.ctx.body = this.service.util.generateResponse(200, 'delete user successfully');
        }
    }

    return User;
}