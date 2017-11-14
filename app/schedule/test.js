module.exports = app => {
    return {
        schedule: {
            interval: '1s',
            type: 'all',
            immediate: false,
            disable: app.config.env === 'local'
        },

        async task(ctx) {
            let result = await ctx.curl('https://registry.npm.taobao.org/egg/latest', {
                dataType: 'json',
                timeout: 3000
            });

            result = result && result.data && result.data.maintainers;
            result.map(obj => {
                // console.log(obj);
            });
        }
    }
}


// app.get('/',function(req,res){
// 	res.writeHead(200,{'Content-Type':'text/html'});
// 	res.write('<head><meta charset = "utf-8"/><title></title></head>')
// 	var file = fs.createReadStream('index.html');
// 	file.pipe(res);
// })