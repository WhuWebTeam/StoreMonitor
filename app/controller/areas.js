module.exports = app => {
    class Area extends app.Controller {

        // index test
        async index() {
            this.ctx.body = {
                code: 200,
                data: {
                    info: 'test successed'
                }
            }
        }


        // query info of all areas
        async getAreas() {
            this.ctx.body = await this.service.areas.query({});
        }


        // query info of some areas with condition query or not
        async getArea() {
            const area = this.ctx.request.body;

            this.ctx.body = await this.service.areas.query(area);
        }


        // modify info of some area specified by id
        async modifyArea() {
            const id = this.ctx.params.areaId;

            // area without id attribute
            let area = this.ctx.request.body;
            
            // add attribute id to area
            area.id = id;

            this.ctx.body = await this.service.areas.update(area);
        }



        // add a area record to areas
        async addArea() {
            const area = this.ctx.request.body;

            // area exists
            if (!await this.service.areas.insert(area)) {
                this.ctx.body = this.service.util.generateResponse(400, 'area exists');
                return;
            }

            this.ctx.body = this.service.util.generateResponse(200, 'add area successed');
        }
    }

    return Area;
}