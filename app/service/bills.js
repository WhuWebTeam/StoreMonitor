module.exports = app => {
	class Bills extends app.Controller {

		// constructor of class Bills
		constructor() {

			// default value of table bills
			this.table = {
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
			}
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