module.exports = app => {
    class User extends app.Controller {
        async index() {
            this.ctx.body = {
                code: 200,
                data: 'Test successful'
            }
        }

        async getUsers() {

        }

        async getUser() {

        }

        async modifyUser() {

        }

        async changePassword() {
            
        }
        
        async addUser() {

        }

        async deleteUser() {
            
        }
    }

    return User;
}