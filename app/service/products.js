

/**
 * Service class of table products
 * @class Products
 * @since 1.0.0
 */
module.exports = app => {
    class Products extends app.Service {

        /**
         * Constructor of class Products
         * @param {Object} app - egg application
         * @since 1.0.0
         */
        constructor(app) {

            // app.Service constructor
            super(app);

            // defalut value of table products
            this.table = {
                id: undefined,
                name: undefined
            };
        }


        /**
         * Judge product exists or not
         * @public
         * @function exists
         * @param {String} id - product's register code
         * @return {Promise<Boolean>}
         * true when products exists
         * false when product doesn't exist
         * @since 1.0.0
         */
        async exists(id) {

            // parameter doesn't exist
            if (!this.service.util.parameterExists(id)) {
                return false;
            }

            // parameter exists
            try {
                // products exsits
                if (await this.service.dbHelp.count('products', 'id', { id })) {
                    return true;
                }

                // products doesn't exsit
                return false;
            } catch (err) {
                return false;
            }
        }


        /**
         * Query products with condition query or not
         * @public
         * @function query
         * @param {Object} product - query condition when query table products
         * @param {Array[String]} attributes - attributes wanted to query
         * @return {Promise<Object>}
         * {} when result ret doesn't exist
         * Object when query condition just includes product.id
         * Array[Object] when query condition without product.id
         * @since 1.0.0
         */
        async query(product, attributes = { id: product.id }) {

            // format product's attributes and query attributes
            product = this.service.util.setTableValue(this.table, product);
            attributes = this.service.util.setQueryAttributes(this.table, attributes);

            // product doesn't exist specified by product id
            if (product.id && !await this.exists(product.id)) {
                return {};
            }

            try {
                // get info of product specified by product id
                if (product.id) {
                    product = await this.service.dbHelp.query('products', attributes, product);
                    return product && product[0];
                }

                // get info of products specified by other attributes
                const products = await this.service.dbHelp.query('products', attributes, product);
                return products;
            } catch (err) {
                return {};
            }
        }


        /**
         * Count the number of products records with  some query condition
         * @public
         * @function count
         * @param {Object} product - query condition when count products record
         * @param {Array[String]} attributes - attributes wanted to count but just use first attribute
         * @return {Promise<Number>}
         * 0 when query error or query result is 0
         * number when query successed and not 0
         * @since 1.0.0
         */
        async count(product, attributes = ['*']) {

            // format product attributes and query attributes
            product = this.service.util.setTableValue(this.table, product);
            attributes = this.service.util.setQueryAttributes(this.table, attributes);

            try {
                return await this.service.dbHelp.count('products', attributes[0], product);
            } catch (err) {
                return 0;
            }
        }


        /**
         * Insert a product record to products
         * @public
         * @function insert
         * @param {Object} product - product record waited to insert into products
         * @return {Promise<Boolean>}
         * true when insert product record successed
         * false when insert product record failed
         * @since 1.0.0
         */
        async insert(product) {

            // format product's attributes
            product = this.service.util.setTableValue(this.table, product);

            // product id doesn't exist
            if (!product.id) {
                return false;
            }

            // product exists
            if (await this.exists(product.id)) {
                return false;
            }

            try {
                // insert product to products
                await this.service.dbHelp.insert('products', product);
                return true;
            } catch (err) {
                return false;
            }
        }


        /**
         * Update products record with some query condition
         * @public
         * @function update
         * @param {Object} product - product record waited to update
         * @param {Object} wheres - query condition
         * @return {Promise<Boolean>}
         * true when update product record successed
         * false when update product record failed
         * @since 1.0.0
         */
        async update(product, wheres = { id: product.id }) {

            // format product's attributes and wheres' attributes
            product = this.service.util.setTableValue(this.table, product);
            wheres = this.service.util.setTableValue(this.table, wheres);

            // authority doesn't exists
            if (product.id && !await this.exists(product.id)) {
                return false;
            }

            // authority exists
            try {
                await this.service.dbHelp.update('products', product, wheres);
                return true;
            } catch (err) {
                return false;
            }
        }


        /**
         * Delete some product records satisfied some query condition
         * @public
         * @function delete
         * @param {Object} product - query condition when delete producs record
         * @return {Promise<Boolean>}
         * true when delete product records successed
         * false when delete product records failed
         * @since 1.0.0
         */
        async delete(product) {

            // format product's attributes
            product = this.service.util.setTableValue(this.table, product);

            // product doesn't exist
            if (product.id && !await this.exists(product.id)) {
                return false;
            }

            try {
                // delete product records satisfied some query condition
                await this.service.dbHelp.delete('products', product);
                return true;
            } catch (err) {
                return false;
            }
        }
    }

    return Products;
}