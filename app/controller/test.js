module.exports = app => {
    class Test extends app.Controller {
        async maxTs() {
            // this.ctx.body = await this.service.cashierSalesInfo.maxTs();
            const productId = await this.service.bills.query({ sysKey: '69921511367251000' }, ['productId']);
            // console.log(productId);
            this.ctx.body = productId;
        }
    }

    return Test;
}