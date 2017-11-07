module.exports = app => {
    class Area extends app.Controller {
        async index() {
            this.ctx.body = {
                code: 200,
                data: {
                    info: 'test successed'
                }
            }
        }

        async getAreas() {
            const areas = await this.service.dbHelp.query('areas', ['*'], {});

            this.ctx.body = {
                code: 400,
                data: areas
            };
        }

        async getAreaById() {
            const id = this.ctx.params.areaId;

            // area exists or not
            if (!await this.service.areas.existsId(id)) {
                this.ctx.body = this.service.util.generateResponse(400, `area whose id is ${id} doesn't exists`);
                return;
            }

            const area = await this.service.dbHelp.query('areas', ['*'], { id });
            this.ctx.body = {
                code: 200,
                data: area[0]
            };
        }

        async getAreaByName() {
            const name = this.ctx.params.areaName;

            // area exists or not
            if (!await this.service.areas.existsName(name)) {
                this.ctx.body = this.service.util.generateResponse(400, `area whose name is ${name} doesn't exist`);
                return;
            }

            const area = await this.service.dbHelp.query('areas', ['*'], { name });
            this.ctx.body = {
                code: 200,
                data: area[0]
            };
        }

        async modifyAreaById() {
            const id = this.ctx.params.areaId;

            // area exists or not
            if (!await this.service.areas.existsId(id)) {
                this.ctx.body = this.service.util.generateResponse(400, `area whoes id is ${id} doesn't exist`);
                return;
            }

            
            const area = this.ctx.request.body;
            
            // exists name same to name waited to be modified
            if (area.name && await this.service.areas.existsName(area.name)) {
                this.ctx.body = this.service.util.generateResponse(400, `name wanted to be setted exists`);
                return;
            }
            
            await this.service.dbHelp.update('areas', area, { id });
            this.ctx.body = this.service.util.generateResponse(200, `modify area successed`);
        }

        async modifyAreaByName() {
            const name = this.ctx.params.areaName;

            // area exists or not
            if (!await this.service.areas.existsName(name)) {
                this.ctx.body = this.service.util.generateResponse(400, `area whoes name is ${name} doesn't exist`);
                return;
            }

            const area = this.ctx.request.body;
            await this.service.dbHelp.update('areas', area, { name });
            this.ctx.body = this.service.util.generateResponse(200, `modify area successed`);
        }

        async addArea() {
            const area = this.ctx.request.body;

            // area exists or not
            if (await this.service.existsId(area.id)) {
                this.ctx.body = this.service.util.generateResponse(400, 'area exists');
                return;
            }

            await this.service.dbHelp.insert('areas', area);
            this.ctx.body = this.service.generateResponse(200, 'add area successed');
        }
    }

    return Area;
}