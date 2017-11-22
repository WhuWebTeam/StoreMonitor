

/**
 * Service class of table areas
 * @class Area
 * @since 1.0.0
 */
module.exports = app => {
    class Areas extends app.Service {

        /**
         * Constructor of class Area
         * @param { Object } app - egg application
         * @constructor
         * @since 1.0.0
         */
        constructor(app) {

            // app.Service's constructor
            super(app);

            // attributes of table Areas
            this.table = {
                id: undefined,
                name: undefined,
                details: undefined
            };
        }


        /**
         * Judge area exists or not
         * @public
         * @function exists
         * @param {String} id - area's register number
         * @return {Promise<Boolean>}
         * true when area specified by id exists
         * false when area specified by id does't exist
         * @since 1.0.0
         */
        async exists(id) {

            // parameter doesn't exist
            if (!this.service.util.parameterExists(id)) {
                return false;
            }

            try {
                // area exists
                if (await this.service.dbHelp.count('areas', 'id', { id })) {
                    return true;
                }

                // area doesn't exist
                return false;
            } catch (err) {
                return false;
            }
        }


        /**
         * Query info of areas with condition query or not
         * @public
         * @function query
         * @param {Obejct} area - condition of table areas'query
         * @param {Array[String]} attributes - array of attributes wanted to be queried
         * @return {Promise<Object>}
         * {} when query set doesn't exist
         * Object when query condition includes id
         * Array[Object] when query condition without id
         * @since 1.0.0
         */
        async query(area, attributes = ['*']) {

            //format area's attributes and query attributes
            area = this.service.util.setTableValue(this.table, area);
            attributes = this.service.util.setQueryAttributes(this.table, attributes);

            // area doesn't exist
            if (area.id && !await this.exists(area.id)) {
                return {};
            }

            try{
                // query info of area specified by id
                if (area.id) {
                    area = await this.service.dbHelp.query('areas', attributes, { id: area.id });
                    return area && area[0];
                }

                // query info of areas specified by attributes without id
                const areas = await this.service.dbHelp.query('areas', attributes, area);
                return areas;
            } catch (err) {
                return {};
            }
        }


        /**
         * Get the count of areas' record with some condition
         * @public
         * @function count
         * @param {Object} area - query condition of table areas
         * @param {Array[String]} attributes - attributes wanted to count but just use first attribute
         * @return {Promise<Number>}
         * 0 when count is 0 or query error
         * number not 0 when query successed and has value without 0
         * @since 1.0.0
         */
        async count(area, attributes = ['*']) {

            // format area's attributes and query attributes
            area = this.service.util.setTableValue(this.table, area);
            attributes = this.service.util.setQueryAttributes(this.table, attributes);

            try {
                return await this.service.dhHelp.count('areas', attribute[0], area);
            } catch (err) {
                return 0;
            }
        }


        /**
         * Add a new area record to areas
         * @public
         * @function insert
         * @param {Object} area - area record waited to be inserted to database
         * @return {Promise<Boolean>}
         * true when insert area record successed
         * false when insert area record failed
         * @since 1.0.0
         */
        async insert(area) {

            // format area record's attributes
            area = this.service.util.setTableValue(this.table, area);

            // area.id doesn't exist
            if (!area.id) {
                return false;
            }

            // area exists
            if (await this.exists(area.id)) {
                return false;
            }

            try {
                // add a new area record to areas
                await this.service.dbHelp.insert('areas', area);
                return true;
            } catch (err) {
                return false;
            }
        }


        /**
         * Update info of area specified by query condition
         * @public
         * @function update
         * @param {Object} area - area record
         * @param {Object} wheres - query condition
         * @return {Promise<Boolean>}
         * true when update successed
         * false when update failed
         * @since 1.0.0
         */
        async update(area, wheres = { id: area.id }) {

            // format the area's attributes and where's attributes
            area = this.service.util.setTableValue(this.table, area);
            wheres = this.service.util.setTableValue(this.table, wheres);

            // area doesn't exist
            if (area.id && !await this.exists(area.id)) {
                return false;
            }

            try {
                // modify info of area specified by id
                await this.service.dbHelp.update('areas', area, wheres);
                return true;
            } catch (err) {
                return false;
            }
        }


        /**
         * Delete some area record satisfied some condition
         * @public
         * @function delete
         * @param {Object} area - query condition of table areas
         * @return {Promise<Boolean>}
         * true when update areas successed
         * false when update areas failed
         * @since 1.0.0
         */
        async delete(area) {

            // format the area's attribute
            area = this.service.util.setTableValue(this.table, area);

            // area doesn't exist
            if (area.id && !await this.exists(area.id)) {
                return false;
            }

            try {
                await this.service.dbHelp.delete('areas', area);
                return true;
            } catch (err) {
                return false;
            }
        }
    }

    return Areas;
}