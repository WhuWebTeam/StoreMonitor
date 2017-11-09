module.exports = app => {
	class Bills extends app.Controller {

		// judge bill exists or not
		async exists(transId, ts) {
			if (await this.service.dbHelp.count('bills', 'id', { transId, ts })) {
				return true;
			} else {
				return false;
			}
		}

		
		// insert a bill record to bills
		async insert(bill) {

			// bill exists
			if (await this.exists(bill.transId, bill.ts)) {
				return false;
			}

			// insert bill to bills
			await this.service.dbHelp.insert('bills', bill);
			return true;
		}
	}

	return Bills;
}