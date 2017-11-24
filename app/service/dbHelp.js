

/**
 * Class of database's simple opration
 * @class DbHelp
 * @since 1.0.0
 */
module.exports = app => {
    class DbHelp extends app.Service {

        /**
         * a inner function used to judge te entry's sencond value is exist or not
         * @private
         * @function _judge
         * @param {string[]} entry - array with length is two parse from object
         * @return {boolean} judge entry[1] isn't exist
         */
        _judge(entry) {
            if (entry[1] === false) {
                return true;
            } else if (entry[1] === 0) {
                return true;
            } else if (entry[1]) {
                return true;
            } else {
                return false;
            }
        }


        /**
         * used to deal update opration of database
         * @public
         * @function update
         * @param {String} tableName - name of table which will be oprated
         * @param {object} obj - attributes will be update in database and 
         * must consistant with database's attributes name, attributes doesn't explicit
         * @param {object} wheres - condition of where 
         * @return {Promise<>} do not return value 
         */
        async update(tableName, obj, wheres) {
            const _this = this;

            // generate query str and values
            const values = [];
            let str = 'update ' + tableName + ' set ';

            // change object to array
            let entries = Object.entries(obj).filter(entry => _this._judge(entry));
            let i = 0;
            for (; i < entries.length; i++) {
                str = str + entries[i][0] + ' = $' + (i + 1) + ', ';
                values.push(entries[i][1]);
            }
            str = str.substr(0, str.length - 2);

            if(JSON.stringify(wheres) === '{}') {
                console.log(str);
                console.log(values);
                await this.app.db.query(str, values);
                return;
            }

            str = str + ' where ';
            entries = Object.entries(wheres).filter(entry => _this._judge(entry));
            for (let j = 0; j < entries.length; j++) {
                str = str + entries[j][0] + ' = $' + (j + i + 1) + ' and ';
                values.push(entries[j][1]);
            }
            str = str.substr(0, str.length - 5);
            console.log(str);
            console.log(values);
            await this.app.db.query(str, values);
        }


        /**
         * used to deal insert opration of database
         * @public
         * @function insert
         * @param {string} tableName - name of table which will be oprated 
         * @param {object} obj - attributes will be insert into database and 
         * must constant with database's attributes name, attributes doesn't explicit
         * @return {Promise<>} do not return value
         */
        async insert(tableName, obj) {
            const _this = this;

            // generate query str and values
            const values = [];
            let str = 'insert into ' + tableName + '(';
            let temp = '(';
            
            // change object to array
            const entries = Object.entries(obj).filter(entry => _this._judge(entry));
            for (let i = 0; i < entries.length; i++) {
                str = str + entries[i][0] + ', ';
                temp = temp + '$' + (i + 1) + ', ';
                values.push(entries[i][1]);
            }
            str = str.substr(0, str.length - 2) + ')';
            temp = temp.substr(0, temp.length - 2) + ')';
            str = str + ' values ' + temp;

            console.log(str);
            console.log(values);
            await this.app.db.query(str, values);
        }


        /**
         * used to deal with query opration of database
         * @public
         * @function query
         * @param {string} tableName - name of table which will be oprated 
         * @param {string[]} attributes - attributes wanted to query
         * attributes must consistant with database's attributes name
         * @param {object} wheres - where condition of query
         * attributes must consistant with database's attributes name
         * @return {Promise<object[]>} the result of query 
         */
        async query(tableName, attributes, wheres) {
            const _this = this;

            // generate query str and values
            const values = [];
            let str = 'select ';
            for (const attribute of attributes) {
                str = str + attribute + ', ';
            }
            str = str.substr(0, str.length - 2);
            str = str + ' from ' + tableName;
        
            // when query without where condition(wheres is a {})
            if (JSON.stringify(wheres) === '{}') {
                const result = await this.app.db.query(str, values);
                // console.log(str);
                // console.log(values);
                return result;
            }

            // where query with where condition (wheres is not a {})
            str = str + ' where ';

            // change object to array
            const entries = Object.entries(wheres).filter(entry => _this._judge(entry));
            if (entries.length === 0) {
                str = str.substr(0, str.length - 7);
                const result = await this.app.db.query(str, values);
                // console.log(str);
                // console.log(values);
                return result;
            }

            for (let i = 0; i < entries.length; i++) {
                str = str + entries[i][0] + ' = $' + (i + 1) + ' and ';
                values.push(entries[i][1]);
            }
            str = str.substr(0, str.length - 5);

            // console.log(str);
            // console.log(values);
            const result = await this.app.db.query(str, values);
            return result;
        }
        

        /**
         * used to count some attribute
         * @public
         * @function count
         * @param {string} tableName - name of table which will be oprated 
         * @param {string} attribute - attribute which will be counted when count
         * attributes must consistant with database's attributes name
         * @param {object} wheres - where condition of query 
         * attributes must consistant with database's attributes name
         * @return {Promise<int>} the amount of count 
         */
        async count(tableName, attribute, wheres) {
            attribute = 'count(' + attribute +')';
            let count = await this.query(tableName, [attribute], wheres);
            count = count && count[0] && count[0].count || 0;
            return +count;
        }


        /**
         * used to deal with delete opration of database
         * @public
         * @function delete
         * @param {string} tableName - name of table which will be oprated
         * @param {object} wheres - where condition of delete
         * attributes must consistant with database's attributes name
         * @return {Promise<>} do not return a value
         */
        async delete(tableName, wheres) {
            const _this = this;

            const values = [];
            let str = 'delete from ' + tableName;
            if (JSON.stringify(wheres) === '{}') {
                await this.app.db.query(str, values);
                return;
            }
            str = str + ' where ';
            const entries = Object.entries(wheres).filter(entry => _this._judge(entry));
            for (let i = 0; i < entries.length; i++) {
                str = str + entries[i][0] + ' = $' + (i + 1) + ' and ';
                values.push(entries[i][1]);
            }
            str = str.substr(0, str.length - 5);

            await this.app.db.query(str, values);
        }
    }

    return DbHelp;
}