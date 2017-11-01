module.exports = app => {
    class Styles extends app.Service {
        async exists() {
            if (await this.service.dbHelp.count('styles', 'style', {})) {
                return true;
            } else {
                return false;
            }
        }
    }

    return Styles;
}