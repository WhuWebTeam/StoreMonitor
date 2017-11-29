module.exports = app => {

	// home page
	app.get('/', 'index.home');

	// wm redirect home page
	app.get('/api/v1/wmHomePage/:userId', 'index.wmHome');

	// clear database
	app.delete('/database', 'index.clear');
}