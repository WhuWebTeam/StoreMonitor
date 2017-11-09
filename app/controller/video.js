module.exports = app => {
    class Video extends app.Controller {

        // index test
        async index() {
            this.ctx.body = {
                code: 200,
                data: {
                    info: 'test successed'
                }
            };
        }

        // get data from DVA system
        async getDVAData() {
            const DVA = this.ctx.request.body;

            // .............. 
        }
    }

    return Video;
}