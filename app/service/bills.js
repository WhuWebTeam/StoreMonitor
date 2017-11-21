module.exports = app => {
    class Bills extends app.Controller {

        // default value of table bills
        constructor(app) {

            // constructor of app.Service
            super(app);

            // default value of table bills
            this.table = {
                id: undefined,
                transId: undefined,
                ts: undefined,
                shopId: undefined,
                counterId: undefined,
                startTime: undefined,
                endTime: undefined,
                scriptVer: undefined,
                productId: undefined,
                price: undefined,
                quantity: undefined,
                amount: undefined,
                cashierId: undefined,
                customerId: undefined,
                eventFalg: undefined
            };
        }


        // Judge bill exists or not through ts
        async exists(ts) {

            // parameter doesn't exist
            if (!this.service.util.parameterExists(ts)) {
                return false;
            }

            // parameter exists
            try {
                // bills exists
                if (await this.service.dbHelp.count('bills', 'ts', { ts })) {
                    return true;
                }

                // bills doesn't exist
                return false;
            } catch (err) {
                return false;
            }
        }


        // Judge bill exists or not through id
        async existsId(id) {

            // parameter doesn't exist
            if (!this.service.util.parameterExists(id)) {
                return false;
            }

            // parameter exists
            try {
                // bills exists
                if (await this.service.dbHelp.count('bills', 'id', { id })) {
                    return true;
                }

                // bills doesn't exist
                return false;
            } catch (err) {
                return false;
            }
        }

        // Query info of bills with some condition
        async query(bill, attributes = ['*']) {

            // format bill's attributes and query attributes
            bill = this.service.util.setTableValue(this.table, bill);
            attributes = this.service.util.setQueryAttributes(this.table, bill);

            // bill doesn't exist through id
            if (bill.id && !await this.existsId(bill.id)) {
                return {};
            }

            // bill doesn't exists through ts
            if (bill.ts && !await this.exists(bill.ts)) {
                return {};
            }

            try {

                // get info through id if id exists
                if (bill.id) {
                    bill = await this.service.dbHelp.query('bills', attributes, { id: bill.id });
                    return bill && bill[0];
                }

                //get info through ts if ts exists
                if (bill.ts) {
                    bill = await this.service.dbHelp.query('bills', attributes, { ts: bill.ts });
                    return bill && bill[0];
                }

                // get info with condition without ts and id
                const bills = await this.service.dbHelp.query('bills', attributes, bill);
                return bill;
            } catch (err) {
                return {};
            }
        }


        // Count bill records with some condition
        async count(bill, attributes = ['*']) {

            // format bill's attributes and query attributes
            bill = this.service.util.setTableValue(this.table, bill);
            attributes = this.service.util.setQueryAttributes(this.table, bill);

            try {
                return await this.service.dbHelp.count('bills', attributes[0], bill);
            } catch (err) {
                return 0;
            }
        }

        // Insert a bill record to bills
        async insert(bill) {

            // format bill's attributes
            bill = this.service.util.setTableValue(this.table, bill);


            // bill.ts doesn't exists
            if (!bill.ts) {
                return false;
            }

            // bill exists
            if (await this.exists(bill.ts)) {
                return false;
            }

            try {
                // insert bill to bills
                await this.service.dbHelp.insert('bills', bill);
                return true;
            } catch (err) {
                return false;
            }
        }

        // Update table bills with some condition
        async update(bill, wheres = { ts: bill.ts }) {

            // format bill's attributes and wheres' attributes
            bill = this.service.util.setTableValue(this.table, bill);
            wheres = this.service.util.setQueryAttributes(this.table, wheres);

            // bill doesn't exist
            if (bill.ts && !await this.exists(bill.ts)) {
                return false;
            }

            try {
                await this.service.dbHelp.update('bills', bill, wheres);
                return true;
            } catch (err) {
                return false;
            }
        }



        // Delete table bills with some condition
        async delete(bill) {

            // format bill's attributes
            bill = this.service.util.setTableValue(this.table, bill);

            // bill doesn't exists
            if (bill.ts && !await this.exists(bill.ts)) {
                return false;
            }

            // bill exists
            try {
                await this.service.dbHelp.delete('bills', bill);
                return true;
            } catch (err) {
                return false;
            }
        }
    }

    return Bills;
}