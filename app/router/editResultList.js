module.exports = app => {
	app.get('/api/v1/editResultList/index', 'editResultList.index');

	app.get('/api/v1/editResultList', 'editResultList.getAllEditResult'); // get all editResult
	app.post('/api/v1/editResultList', 'editResultList.addEditResult'); // add a new editResult record
}