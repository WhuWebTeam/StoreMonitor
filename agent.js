module.exports = agent => {

    agent.messenger.on('egg-ready', info => {

        console.log(info);
        agent.messenger.sendToApp('hint-action','agent get info from master');
    });
}