module.exports = app => {
    class EditResultList extends app.Controller {

        async index() {
            this.ctx.body = {
                code: 200,
                data: {
                    info: 'test successed'
                }
            };
        }


        async getAllEditResult() {
            const editResults = await this.service.editResultList.query({}, ['id', 'name']);

            this.ctx.body = {
                code: 200,
                data: editResults
            };
        }


        async addEditResult() {
            const editResult = this.ctx.request.body;
            if (!await this.service.editResultList.insert(editResult)) {
                this.ctx.body = this.service.util.generateResponse(404, 'add editResult failed');
                return;
            }

            this.ctx.body = this.service.util.generateResponse(201, 'add eiditResult successed');
        }
    }

    return EditResultList;
}