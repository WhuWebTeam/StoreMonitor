

/**
 * Service class of table shops
 * @class Shops
 * @since 1.0.0
 */
module.exports = app => {
    class Shops extends app.Service {

        /**
         * Constructor of class Shops
         * @param {Object} app - egg application
         * @constructor
         * @since 1.0.0
         */
        constructor(app) {

            // constructor of app.Service
            super(app);

            // default value of table shops
            this.table = {
                id: undefined,
                areaId: undefined,
                name: undefined,
                detailts: undefined
            };
        }


        /**
         * Judge shop exists or not throught shop.id
         * @public
         * @function exists
         * @param {String} id - shop's register code
         * @return {Promise<Boolean>}
         * true when shop exists
         * false when shop doesn't exist
         * @since 1.0.0
         */
        async exists(id) {

            // parameter doesn't exist
            if (!this.service.util.parameterExists(id)) {
                return false;
            }

            // parameter exists
            try {
                // shop exists
                if (await this.service.dbHelp.count('Shops', 'id', { id })) {
                    return true;
                }

                // shop doesn't exist
                return false;
            } catch (err) {
                return false;
            }
        }


        /**
         * Query shop info with condition query or not
         * @public
         * @function query
         * @param {Object} shop - query condition of table shop
         * @param {Array[String]} attributes - attributes wanted to query
         * @return {Promise<Object>}
         * {} when query set doesn't exist
         * Object when query condition just includes attribute shop.id
         * Array[Object] when query condition without shop.id
         * @since 1.0.0
         */
        async query(shop, attributes = ['*']) {

            // format shop's attributes and query attributes
            shop = this.service.util.setTableValue(this.table, shop);
            attributes = this.service.util.setQueryAttributes(this.table, attributes);

            // shop doesn't exist
            if (shop.id && !await this.exists(shop.id)) {
                return {};
            }

            try {
                // query info of shop specified by id
                if (shop.id) {
                    shop = await this.service.dbHelp.query('shops', attributes, { id: shop.id });
                    return shop && shop[0];
                }

                // query info of shops without id attributes
                const shops = await this.service.dbHelp.query('shops', attributes, shop);
                return shops;
            } catch (err) {
                return {};
            }
        }


        /**
         * Count the shops records' number satisfied some query condition
         * @public
         * @function count
         * @param {Object} shop - query condition of table shops
         * @param {Array[String]} attributes - attributes wanted to count but just use first attribute
         * @return {Promise<Number>}
         * 0 when query error or result is 0
         * number when query successed and not 0
         * @since 1.0.0
         */
        async count(shop, attributes = ['*']) {

            // format shops' attributes and query attributes
            shop = this.service.util.setTableValue(this.table, shop);
            attributes = this.service.util.setQueryAttributes(this.table, attributes);

            try {
                return await this.service.dbHelp.count('shops', attributes[0], shop);
            } catch (err) {
                return 0;
            }
        }


        /**
         * Insert shop record to shops
         * @public
         * @function insert
         * @param {Object} shop - shop record waited to insert into shops
         * @return {Promise<Boolean>}
         * true when insert shop record successed
         * false when insert record failed
         */
        async insert(shop) {

            // format shop record's attributes
            shop = this.service.util.setTableValue(this.table, shop);

            // shop.id doesn't exist
            if (!shop.id) {
                return false;
            }

            // shop record exists
            if (await this.exists(shop.id)) {
                return false;
            }

            try {
                // insert shop record to shops
                await this.service.dbHelp.insert('shops', shop);
                return true;
            } catch (err) {
                return false;
            }
        }


        /**
         * Update info of shop specified by id
         * @public
         * @function update
         * @param {Object} shop - shop record
         * @param {Object} wheres - query condition when update shop records
         * @return {Promise<Boolean>}
         * true when update shop record successed
         * false when update shop record failed
         * @since 1.0.0
         */
        async update(shop, wheres = { id: shop.id }) {

            // format shop's attributes and wheres' attribute
            shop = this.service.util.setTableValue(this.table, shop);
            wheres = this.service.util.setTableValue(this.table, wheres);

            // shop doesn't exist
            if (shop.id && !await this.exists(shop.id)) {
                return false;
            }

            // areaId attributes included in shop and area specified by areaId doesn't exists
            if (shop.areaId && !await this.service.areas.exists(shop.areaId)) {
                return false;
            }

            try {
                // modify shops info
                await this.service.dbHelp.update('shops', shop, wheres);
                return true;
            } catch (err) {
                return false;
            }
        }


        /**
         * Delete some shops records satisfied some condition
         * @public
         * @function delete
         * @param {Object} shop - query condition when delete shop records
         * @return {Promise<Boolean>}
         * true when delete shop records successed
         * false when delete shop records failed
         * @since 1.0.0
         */
        async delete(shop) {

            // format shop's attributes
            shop = this.service.util.setTableValue(this.table, shop);

            // shop doesn't exist
            if (shop.id && !await this.exists(shop.id)){
                return false;
            }

            try {
                // delete shop records satisfied condition shop
                await this.service.dbHelp.delete('shops', shop);
                return true;
            } catch (err) {
                return false;
            }
        }
    }

    return Shops;
}