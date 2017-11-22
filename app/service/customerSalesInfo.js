module.exports = app => {
	class CustomerSalesInfo extends app.Service {

		// get default value of table cashierSalesInfo
		constructor(app) {

			// constructor of app.Service
			super(app);

			// the default value table cutomerSalesInfo
			this.table = {
				id: undefined,
				customerId: undefined,
				transId: undefined,
				productId: undefined,
				ts: undefined,
				price: undefined,
				quantity: undefined,
				amount: undefined
			};
		}


		// judge customerSalesInfo exists or not
		async exists(ts) {

			// parameter doesn't exist
			if (!this.service.util.parameterExists(ts)) {
				return false;
			}

			// parameter exists
			try {
				// customerSaleInfo exist
				if (await this.service.dbHelp.count('CustomerSalesInfo', 'ts', { ts })) {
					return true;
				}
				
				// customerSaleInfo doesn't exists
				return false;
			} catch (err) {
				return false;
			}
		}


		// Judge customerSalesInfo exsits or not through customerSalesInfo
		async existsId(id) {

			// parameter doesn't exist
			if (!this.servcie.util.parameterExists(id)) {
				return false;
			}

			// parameter exists
			try {
				// customerSaleInfo doesn't exist
				if (await this.service.dbHelp.count('customerSalesInfo', 'id', { id })) {
					return true;
				}
				
				// customerSaleInfo exists
				return false;
			} catch (err) {
				return false;
			}
		}


		// query customerSaleInfo specified by id, customerId, transId, price, quantity, amount
		async query(customerSaleInfo, attributes = ['*']) {

			// formate customerSaleInfo's attributes and query's attributes
			customerSaleInfo = this.service.util.setTableValue(this.table, customerSaleInfo);
			attributes = this.service.util.setQueryAttributes(this.table, attributes);

			// customerSaleInfo doesn't exist through id
			if (customerSaleInfo.id && !await this.existsId(customerSaleInfo.id)) {
				return {};
			}

			// customerSaleInfo doesn't exist through ts
			if (customerSaleInfo.ts && !await this.exists(customerSaleInfo.ts)) {
				return {};
			}

			try {
				// query info of customerSaleInfo specified by id
				if (customerSaleInfo.id) {
					customerSaleInfo = await this.service.dbHelp.query('customerSalesInfo', attributes, { id: customerSaleInfo.id });
					return customerSaleInfo && customerSaleInfo[0];
				}

				// query info of customerSaleInfo specified by ts
				if (customerSaleInfo.ts) {
					customerSaleInfo = await this.service.dbHelp.query('customerSalesInfo', attributes, { ts: customerSaleInfo.ts });
					return customerSaleInfo && customerSaleInfo[0];
				}

				// query info of customerSaleInfo specified by attributes without customerSaleInfo's id
				const customerSalesInfo = await this.servcie.dbHelp.query('customerSalesInfo', attributes, customerSalesInfo);
				return customerSalesInfo;
			} catch(err) {
				return {};
			}
		}

		// Count customerSaleInfo record satisfied some query condition
		async count(customerSaleInfo, attributes = ['*']) {

			// format customerSaleInfo's attributes and query's attributes
			customerSaleInfo = this.service.util.setTableValue(this.table, customerSaleInfo);
			attributes = this.service.util.setQueryAttributes(this.table, attributes);

			try {
				return await this.service.dbHelp.count('customerSalesInfo', attributes[0], customerSaleInfo);
			} catch (err) {
				return 0;
			}
		}


		// Insert customerSaleInfo queried from bills to CustomerSalesInfo
		async insert(customerSaleInfo) {

			// format customerSaleInfo's attributes
			customerSaleInfo = this.service.util.setTableValue(this.table, customerSaleInfo);

			// customerSalesInfo exists
			if (await this.exists(customerSaleInfo.ts)) {
				return false;
			}

			// add a new customerSalesInfo record
			try {
				await this.service.dbHelp.insert('customerSalesInfo', customerSaleInfo);
				return true;
			} catch (err) {
				return false;
			}
		}


		// Update customerSaleInfo satisfied some query condition
		async update(customerSaleInfo, wheres = { ts: customerSaleInfo.ts }) {

			// format customerSaleInfo and where's attributes
			customerSaleInfo = this.service.util.setTableValue(this.table, customerSaleInfo);
			attributes = this.service.util.setTableValue(this.table, wheres);

			// customerSaleInfo doesn't exist
			if (customerSaleInfo.ts && !await this.exists(customerSaleInfo.ts)) {
				return false;
			}

			try {
				await this.service.dbHelp.update('customerSalesInfo', customerSaleInfo, wheres);
				return true;
			} catch (err) {
				return false;
			}
		}

		// Delete customerSaleInfo satisfied some query condition
		async delete(customerSaleInfo) {
				
			// format customerSaleInfo's attributes
			customerSaleInfo = this.service.util.setTableValue(this.table, customerSaleInfo);	
			
			// customeSaleInfo doesn't exist
			if (customerSaleInfo.ts &&!await this.exists(customerSaleInfo.ts)) {
				return false;
			}

			try {
				await this.service.dbHelp.delete('customerSalesInfo', customerSaleInfo);
				return true;
			} catch (err) {
				return false;
			}
		}


		// migrate new data from bills to customerSalesInfo
		async migrate() {
			const ts = await this.maxTs();

			const str = `insert into customerSalesInfo(customerId, transId, productId, ts, price, quantity, amount)
						 select b.customerId, b.transId, b.productId, b.ts, b.price, b.quantity, b.amount from bills b
						 where ts > $1`;

			try {
				await this.app.db.query(str, [ts]);
				await this.service.logger.logDefault('running', 'migrate new data from bills to customerSalesInfo successed')
			} catch (err) {
				await this.service.logger.logDefault('error', 'migrate new data from bills to customerSalesInfo failed')
			}
		}

		
		// query max ts time
		async maxTs() {
			const sqlStr = 'select max(ts) from customerSalesInfo';
			let ts = await this.app.db.query(sqlStr);

			return ts && ts[0] && ts[0].max || 0;
		}
	}

	return CustomerSalesInfo;
}