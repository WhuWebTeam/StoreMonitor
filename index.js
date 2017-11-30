module.exports = () => {
    
    class Index {

        // init database add admin user
        async databaseInit(app) {

            // select admin users;
            let str = 'select count(id) from users where id = $1';
            const user = await app.db.query(str, ['0000000000']);

            // admin user exists
            if (user && user[0] && +user[0].count) {
                return;
            }

            // init admin user when admin doesn't exists in database
            str = 'insert into users (id, password) values ($1, $2)';
            await app.db.query(str, ['0000000000', '123']);
        }
    }

    return Index;
}
