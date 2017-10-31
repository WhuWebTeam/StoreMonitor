module.exports = app => {
    class Event extends app.Controller {
        async index() {
            this.ctx.body = {
                code: 400,
                data: 'Test Successful'
            }
        }


        async addVedioRecord() {
            const posList = this.ctx.request.body;

            const Styles = posList.Styles;

            const Events = posList.Events;

            let list = {};
            list.transId = posList.TransID;
            list.regId = posList.RegID;
            list.cashierId = posList.CashierID;
            list.tsStart = posList.TsStart;
            list.tsEnd = posList.TsEnd;
            list.scriptVer = posList.ScriptVer;
            list.vedioUrl = posList.VideoUrl
            list.priority = posList.Priority
            list.createAt = Date.parse(new Date());
            list.updateAt = Date.parse(new Date());
            //list.state = postList.
            list.result = '';
            list.shopId = postList.ShopID

            this.ctx.body = this.service.util.generateResponse(200, 'add vedio record successfully');
        }
    }

    return Event;
}