module.exports = app => {
    class Areas extends app.Service {

        // constructor of class Areas
        constructor() {

            // default value of table area
            this.table = {
                id: '0000000000',
                name: '',
                details: ''
            };
        }


        // judge area exists or not
        async exists(id) {
            if (await this.service.dbHelp.count('areas', 'id', { id })) {
                return true;
            } else {
                return false;
            }
        }


        // add a new area record to areas
        async insert(area) {
            
            // area exists
            if (await this.exists(area.id)) {
                return false;
            }

            // add a new area record to areas
            await this.service.dbHelp.insert('areas', area);
            return true;
        }


        // query info of areas with condition query or not
        async query(area) {

            // area doesn't exists
            if (area.id && !await this.exists(area.id)) {
                return this.service.util.generateResponse(400, `area doesn't exists`);
            }

            // query info of area specified by id
            if (area.id) {
                area = await this.service.dbHelp.query('areas', ['*'], { id: area.id });
                return {
                    code: 200,
                    data: area && area[0]
                };
            }

            // query info of areas specified by attributes without id
            const areas = await this.service.dbHelp.query('areas', ['*'], area);
            return {
                code: 200,
                data: areas
            }
        }

        // update info of area specified by id
        async update(area) {
            
            // area doesn't exist
            if (!await this.exists(area.id)) {
                return this.service.util.generateResponse(400, `area doesn't exist`);
            }

            // modify info of area specified by id
            await this.service.dbHelp.update('areas', area, { id: area.id });
            return this.service.util.generateResponse(200, `modify area's info successed`);
        }
    }

    return Areas;
}