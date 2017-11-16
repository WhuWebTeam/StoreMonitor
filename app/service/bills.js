module.exports = app => {
	class Bills extends app.Controller {

		// default value of table bills
		getTable() {
			const table = {
				transId: '',
				ts: 0,
				shopId: '0000000000',
				counterId: '0000000000',
				startTime: '',
				endTime: '',
				scriptVer: '',
				productId: '0000000000',
				price: '',
				quantity: '',
				amount: '',
				cashierId: '0000000000',
				customerId: '0000000000',
				eventFalg: ''
			};
			return table;
		}


		// judge bill exists or not
		async exists(ts) {
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