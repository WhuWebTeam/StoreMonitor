module.exports = app => {
    class WuMartUsers extends app.Service {

        // constructor of class WuMartUsers
        constructor() {

            // default value of table WuMartUsers
            this.table = {
                wmUserId: '00000000',
                wmUserLvl: '',
                userName: '',
                phone: '',
                email: '',
                authorityId: ''
            };
        }


        // judge user of wu mei market exists or not
        async exists(wmUserId) {
            if (await this.service.dbHelp.count('userswm', 'wmUserId', { wmUserId })) {
                return true;
            } else {
                return false;
            }
        }

        
        // insert wu mei user record to userswm
        async insert(userwm) {

            userwm = this.service.util.setTableValue(this.table, userwm);

            // user exists
            if (await this.exists(userwm.wmUserId)) {
                return false;
            }

            // add a user record to userswm
            await this.service.dbHelp.insert('userswm', userwm);
            return true;
        }


        // query info of some wu mei users specified by wmUserId, wmUserLvl, authorityId, name, phone or email
        async query(userwm) {

            userwm = this.service.util.setTableValue(this.table, userwm);
            
            // user doesn't exist
            if (userwm.wmUserId && !await this.exists(userwm.wmUserId)) {
                return this.service.util.generateResponse(400, `user of wu mei market doesn't exist`);
            }

            // query info of wu mei user specified by wmUserId
            if (userwm.wmUserId) {
                userwm = await this.service.dbHelp.query('userswm', ['*'], { wmUserId: userwm.wmUserId });
                return {
                    code: 200,
                    data: userwm && userwm[0]
                };
            }

            // query info of wu mei users specified by attributes without wmUserId
            const userswm = await this.service.dbHelp.query('userswm', ['*'], { wmUserId: userwm.wmUserId });
            return {
                code: 200,
                data: userswm
            }
        }
    }

    return WuMartUsers;
}