

/**
 * Service class of table editResultList
 * @class EditResultList
 * @since 1.0.0
 */
module.exports = app => {
    class EditResultList extends app.Service {

        /**
         * Constructor of class EditResultList
         * @param { Object } app - egg application
         * @constructor
         * @since 1.0.0
         */
        constructor(app) {

            // app.Service's constructor
            super(app);

            // attributes of table editResultList
            this.table = {
                id: undefined,
                name: undefined,
                details: undefined
            };
        }


        /**
         * Judge editResultList exists or not
         * @public
         * @function exists
         * @param {String} id - editResultList's register number
         * @return {Promise<Boolean>}
         * true when editResultList specified by id exists
         * false when editResultList specified by id does't exist
         * @since 1.0.0
         */
        async exists(id) {

            // parameter doesn't exist
            if (!this.service.util.parameterExists(id)) {
                return false;
            }

            try {
                // editResultList exists
                if (await this.service.dbHelp.count('editResultList', 'id', { id })) {
                    return true;
                }

                // editResultList doesn't exist
                return false;
            } catch (err) {
                return false;
            }
        }


        /**
         * Query info of editResultList with condition query or not
         * @public
         * @function query
         * @param {Obejct} editResultList - condition of table editResultList'query
         * @param {Array[String]} attributes - array of attributes wanted to be queried
         * @return {Promise<Object>}
         * {} when query set doesn't exist
         * Object when query condition includes id
         * Array[Object] when query condition without id
         * @since 1.0.0
         */
        async query(editResultList, attributes = ['*']) {

            //format editResultList's attributes and query attributes
            editResultList = this.service.util.setTableValue(this.table, editResultList);
            attributes = this.service.util.setQueryAttributes(this.table, attributes);

            // editResultList doesn't exist
            if (editResultList.id && !await this.exists(editResultList.id)) {
                return {};
            }

            try{
                // query info of editResultList specified by id
                if (editResultList.id) {
                    editResultList = await this.service.dbHelp.query('editResultList', attributes, { id: editResultList.id });
                    return editResultList && editResultList[0];
                }

                // query info of editResultList specified by attributes without id
                editResultList = await this.service.dbHelp.query('editResultList', attributes, editResultList);
                return editResultList;
            } catch (err) {
                return {};
            }
        }


        /**
         * Get the count of editResultList' record with some condition
         * @public
         * @function count
         * @param {Object} editResultList - query condition of table editResultList
         * @param {Array[String]} attributes - attributes wanted to count but just use first attribute
         * @return {Promise<Number>}
         * 0 when count is 0 or query error
         * number not 0 when query successed and has value without 0
         * @since 1.0.0
         */
        async count(editResultList, attributes = ['*']) {

            // format editResultList's attributes and query attributes
            editResultList = this.service.util.setTableValue(this.table, editResultList);
            attributes = this.service.util.setQueryAttributes(this.table, attributes);

            try {
                return await this.service.dhHelp.count('editResultList', attribute[0], editResultList);
            } catch (err) {
                return 0;
            }
        }


        /**
         * Add a new editResultList record to editResultList
         * @public
         * @function insert
         * @param {Object} editResultList - editResultList record waited to be inserted to database
         * @return {Promise<Boolean>}
         * true when insert editResultList record successed
         * false when insert editResultList record failed
         * @since 1.0.0
         */
        async insert(editResultList) {

            // format editResultList record's attributes
            editResultList = this.service.util.setTableValue(this.table, editResultList);

            // editResultList.id doesn't exist
            if (!editResultList.id) {
                return false;
            }

            // editResultList exists
            if (await this.exists(editResultList.id)) {
                return false;
            }

            try {
                // add a new editResultList record to editResultList
                await this.service.dbHelp.insert('editResultList', editResultList);
                return true;
            } catch (err) {
                return false;
            }
        }


        /**
         * Update info of editResultList specified by query condition
         * @public
         * @function update
         * @param {Object} editResultList - editResultList record
         * @param {Object} wheres - query condition
         * @return {Promise<Boolean>}
         * true when update successed
         * false when update failed
         * @since 1.0.0
         */
        async update(editResultList, wheres = { id: editResultList.id }) {

            // format the editResultList's attributes and where's attributes
            editResultList = this.service.util.setTableValue(this.table, editResultList);
            wheres = this.service.util.setTableValue(this.table, wheres);

            // editResultList doesn't exist
            if (editResultList.id && !await this.exists(editResultList.id)) {
                return false;
            }

            try {
                // modify info of editResultList specified by id
                await this.service.dbHelp.update('editResultList', editResultList, wheres);
                return true;
            } catch (err) {
                return false;
            }
        }


        /**
         * Delete some editResultList record satisfied some condition
         * @public
         * @function delete
         * @param {Object} editResultList - query condition of table editResultList
         * @return {Promise<Boolean>}
         * true when update editResultList successed
         * false when update editResultList failed
         * @since 1.0.0
         */
        async delete(editResultList) {

            // format the editResultList's attribute
            editResultList = this.service.util.setTableValue(this.table, editResultList);

            // editResultList doesn't exist
            if (editResultList.id && !await this.exists(editResultList.id)) {
                return false;
            }

            try {
                await this.service.dbHelp.delete('editResultList', editResultList);
                return true;
            } catch (err) {
                return false;
            }
        }
    }

    return EditResultList;
}