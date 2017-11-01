module.exports = app => {
    class Event extends app.Controller {
        async index() {
            this.ctx.body = {
                code: 400,
                data: 'Test Successful'
            }
        }


        async addVideoRecord() {
            const posList = this.ctx.request.body;

            const Styles = posList.Styles;

            const Events = posList.Events;

            // format lists' record in database.lists
            let list = {};
            Object.entries(posList).map(entry => {
                if (entry[0] === 'Styles' || entry[0] === 'Events') {
                    return;
                }
                list[entry[0]] = entry[1];
            });
            list.createAt = Date.parse(new Date());
            list.updateAt = Date.parse(new Date());
            list.result = '';

            // try {
                await this.service.dbHelp.insert('lists', list);

                for (const style in Styles) {

                    // format style structure in database.styles
                    Styles[style].createAt = Date.parse(new Date());
                    Styles[style].updateAt = Date.parse(new Date());
                    Styles[style].transId = posList.TransID;

                    await this.service.dbHelp.insert('styles', Styles[style]);
                }

                for (const event in Events) {
                    const tempEvent = {};

                    // format event structure in database.events
                    Object.entries(Events[event]).map(entry => {
                        if (entry[0] ==='Start') {
                            tempEvent.eStart = entry[1];
                        } else if (entry[0] === 'End') {
                            tempEvent.eEnd = entry[1];
                        } else {
                            tempEvent[entry[0]] = entry[1];
                        }
                    });
                    tempEvent.transId = posList.TransID;
                    tempEvent.createAt = Date.parse(new Date());
                    tempEvent.updateAt = Date.parse(new Date());


                    await this.service.dbHelp.insert('events', tempEvent);
                }

                this.ctx.body = this.service.util.generateResponse(200, 'add video record successfully');
            // }
            // catch(e) {
            //     this.ctx.body = this.service.util.generateResponse(400, 'add video record failed');
            // }
        }
    }

    return Event;
}