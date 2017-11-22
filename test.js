		// query max ts time
		async function maxTs() {
			query({}, ['max(ts)']);
			
        }
        
        async function query(cashierSaleInfo, attributes = ['*']) {
            
                    //     // setcashierSalesInfo's attributes and query attributes
                    //     cashierSaleInfo = this.service.util.setTableValue(this.table, cashierSaleInfo);
                    //     attributes = this.service.util.setQueryAttributes(this.table, attributes);
            
                    //     console.log(cashierSaleInfo);
                    //     console.log(attributes);
            
                    //     // cashierSaleInfo doesn't exist throught cashierSaleInfo.id
                    //     if (cashierSaleInfo.id && !await this.existsId(cashierSaleInfo.id)) {
                    //         return {};
                    //     }
            
                    //     // cashierSaleInfo doesn't exist through cashierSaleInfo.ts
                    //     if (cashierSaleInfo.ts && !await this.exists(cashierSaleInfo.ts)) {
                    //         return {};
                    //     }
            
                    //     try {
                    //         // query info of cashierSaleInfo specified by id
                    //         if (cashierSaleInfo.id) {
                    //             cashierSaleInfo = await this.service.dbHelp.query('cashierSalesInfo', attributes, { id: cashierSaleInfo.id });
                    //             return cashierSaleInfo && cashierSaleInfo[0];
                    //         }
            
                    //         // query info of cashierSaleInfo specified by ts
                    //         if (cashierSaleInfo.ts) {
                    //             cashierSaleInfo = await this.service.dbHelp.query('cashierSalesInfo', attributes, { ts: cashierSaleInfo.ts });
                    //             return cashierSaleInfo && cashierSaleInfo[0];
                    //         }
            
                    //         // query info of cashierSaleInfo specified by attributes without cashierSaleInfo's id
                    //         const cashierSalesInfo = await this.service.dbHelp.query('cashierSalesInfo', attributes, cashierSaleInfo);
                    //         return cashierSalesInfo;
                    //     } catch (err) {
                    //         return {};
                    //     }
                    console.log(attributes);
                    }

                    maxTs();