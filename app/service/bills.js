module.exports = app => {
	class Bills extends app.Controller {

		// default value of table bills
		getTable() {
			const table = {
				transId: '',
				ts: '',
				shopId: '',
				counterId: '',
				startTime: '',
				endTime: '',
				scriptVer: '',
				productId: '',
				price: '',
				quantity: '',
				amount: '',
				cashierId: '',
				customerId: '',
				eventFalg: ''
			};
			return table;
		}


		// judge bill exists or not
		async exists(ts) {

			// parameter doesn't exist
			if (!this.service.util.parameterExists(id)) {
				return false;
			}

			// parameter exists
			if (await this.service.dbHelp.count('bills', 'id', { ts })) {
				return true;
			} else {
				return false;
			}
		}

		
		// insert a bill record to bills
		async insert(bill) {

			bill = this.service.util.setTableValue(this.getTable(), bill);

			// bill exists
			if (await this.exists(bill.ts)) {
				return false;
			}

			// insert bill to bills
			await this.service.dbHelp.insert('bills', bill);
			return true;
		}
	}

	return Bills;
}