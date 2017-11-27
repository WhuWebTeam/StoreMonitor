

/**
 * Controller class EditResultList
 * @module editResultList
 * @since 1.0.0
 */
module.exports = app => {
    class EditResultList extends app.Controller {

        /**
         * Index test
         * @public
         * @method EditResultList#index
         * @since 1.0.0
         */
        async index() {
            this.ctx.body = {
                code: 200,
                data: {
                    info: 'test successed'
                }
            };
        }


        /**
         * Get all editResult which can be selected
         * @public
         * @method EditResultList#getAllEditResult
         * @since 1.0.0
         */
        async getAllEditResult() {
            const editResults = await this.service.editResultList.query({}, ['id', 'name']);

            this.ctx.body = {
                code: 200,
                data: editResults
            };
        }


        /**
         * Add a new editResult which can be selected to database
         * @public
         * @method EditReslutList#addEditReslut
         * @since 1.0.0
         */
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