module.exports = app => {
	class CashierSalesInfo extends app.Service {

		// get default value of table cashierSalesInfo
		constructor(app) {

			// constructor of app.Service
			super(app);

			// the default value of table cashierSalesInfo
			this.table = {
				id: undefined,
				cashierId: undefined,
				transId: undefined,
				ts: undefined,
				duration: undefined,
				amount: undefined,
				rate: undefined
			};
		}


		// Judge cashierSalesInfo exists or not through ts
		async exists(ts) {

			// parameter doesn't exist
			if (!this.service.util.parameterExists(ts)) {
				return false;
			}

			try {
				// cashierSaleInfo exists
				if (await this.service.dbHelp.count('cashierSalesInfo', 'ts', { ts })) {
					return true;
				}
				
				// cashierSaleInfo doesn't exist
				return false;
			} catch (err) {
				return false;
			}
		}

		// Judge cashierSaleInfo exists or not through id
		async existsId(id) {

			// parameter doesn't exist
			if (!this.service.util.parameterExists(id)) {
				return false;
			}

			try {
				// cashierSaleInfo exists
				if (await this.service.dbHelp.count('cashierSalesInfo', 'id', { id })) {
					return true;
				}

				// cashierSaleInfo doesn't exist
				return false;
			} catch (err) {
				return false;
			}
		}


		// Query cashierSalesInfo with condition query or not
		async query(cashierSaleInfo, attributes = ['*']) {

			// setcashierSalesInfo's attributes and query attributes
			cashierSaleInfo = this.service.util.setTableValue(this.table, cashierSaleInfo);
			attributes = this.service.util.setQueryAttributes(this.table, attributes);

			// cashierSaleInfo doesn't exist throught cashierSaleInfo.id
			if (cashierSaleInfo.id && !await this.existsId(cashierSaleInfo.id)) {
				return {};
			}

			// cashierSaleInfo doesn't exist through cashierSaleInfo.ts
			if (cashierSaleInfo.ts && !await this.exists(cashierSaleInfo.ts)) {
				return {};
			}

			try {
				// query info of cashierSaleInfo specified by id
				if (cashierSaleInfo.id) {
					cashierSaleInfo = await this.service.dbHelp.query('cashierSalesInfo', attributes, { id: cashierSaleInfo.id });
					return cashierSaleInfo && cashierSaleInfo[0];
				}

				// query info of cashierSaleInfo specified by ts
				if (cashierSaleInfo.ts) {
					cashierSaleInfo = await this.service.dbHelp.query('cashierSalesInfo', attributes, { ts: cashierSaleInfo.ts });
					return cashierSaleInfo && cashierSaleInfo[0];
				}

				// query info of cashierSaleInfo specified by attributes without cashierSaleInfo's id
				const cashierSalesInfo = await this.service.query('cashierSalesInfo', attributes, cashierSalesInfo);
				return cashierSalesInfo;
			} catch (err) {
				return {};
			}
		}

		// Count the CashierSaleInfo record with some condition
		async count(cashierSaleInfo, attributes = ['*']) {

			// format cashierSaleInfo's attributes and query attributes
			cashierSaleInfo = this.service.util.setTableValue(this.table, cashierSaleInfo);
			attributes = this.service.util.setQueryAttributes(this.table, attributes);

			try {
				return await this.service.dbHelp.count('cashierSalesInfo', attributes[0], cashierSaleInfo);
			} catch (err) {
				return 0;
			}
		}



		// Insert cashierSalesInfo queried from bills to cashierSalesInfo
		async insert(cashierSalesInfo) {

			// format cashierSaleInfo's attributes
			cashierSalesInfo = this.service.util.setTableValue(this.table, cashierSalesInfo);


			// cashierSaleInfo's ts doesn't exist
			if (!cashierSaleInfo.ts) {
				return false;
			}
			
			// cashierSaleInfo doesn't exist
			if (await this.exists(cashierSalesInfo.ts)) {
				return false;
			}

			try {
				await this.service.dbHelp.insert('cashierSalesInfo', cashierSaleInfo);
				return true;
			} catch (err) {
				return false;
			}
		}


		// update cashierSalesInfo with some condition
		async update(cashierSaleInfo, wheres = { ts: cashierSaleInfo.ts }) {

			// format cashierSaleInfo's attributes and wheres' attributes
			cashierSaleInfo = this.service.util.setTableValue(this.table, cashierSaleInfo);
			wheres = this.service.util.setTableValue(this.table, wheres);

			// cashierSaleInfo doesn't exist
			if (cashierSaleInfo.ts && !await this.exists(cashierSaleInfo.ts)) {
				return false;
			}

			try {
				await this.service.dbHelp.update('cashierSalesInfo', cashierSaleInfo, wheres);
				return true;
			} catch (err) {
				return false;
			}
		}


		// Delete cashierSaleInfo with some condition
		async delete(cashierSaleInfo) {

			// format cashierSaleInfo's attributes
			cashierSaleInfo = this.service.util.setTableValue(this.table, cashierSaleInfo);

			
			// cashierSaleInfo doesn't exist
			if (cashierSaleInfo.ts && !await this.exists(cashierSaleInfo.ts)) {
				return false;
			}

			try {
				await this.service.dbHelp.delete('cashierSalesInfo', cashierSaleInfo);
				return true;
			} catch (err) {
				return false;
			}
		}

		
		// query max ts time
		async maxTs() {
			const str = 'select max(ts) from cashierSalesInfo';
			let ts = await this.app.db.query(str);

			return ts && ts[0] && ts[0].max || 0;
		}


		// migrate new data from bills to cashierSalesInfo
		async migrate() {
			const ts = await this.maxTs();

			const str = `insert into cashierSalesInfo(cashierId, transId, ts, duration, amount, rate)
						 select b.cashierId, b.transId, b.ts, c.duration, b.amount,
							 case when b.amount = 0 then 0
								 else c.duration / b.amount
								 end rate
						 from bills b inner join
							 (select transId, max(ts) - min(ts) duration
							 from bills
							 where ts > $1
							 group by transId) c on b.transId = c.transId
						 where ts > $1`;

			try {
				await this.app.db.query(str, [ts]);
				await this.service.logger.logDefault('running', 'migrate new data from bills to cashierSalesInfo successed');
			} catch (err) {
				await this.service.logger.logDefault('error', `migrate new data from bills to cashierSalesInfo failed: ${err}`);
			}
		}
	}

	return CashierSalesInfo;
}