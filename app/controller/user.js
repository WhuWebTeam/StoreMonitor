module.exports = app => {
    class User extends app.Controller {
        async index() {
            this.ctx.body = {
                code: 200,
                data: 'Test successful'
            }
        }

        async getUsers() {
            const users = await this.service.dbHelp.query('users', '*', {});
            this.ctx.body
        }

        async getUser() {

        }

        async modifyUser() {

        }

        async addUser() {

        }

        async deleteUser() {
            
        }
    }

    return User;
}