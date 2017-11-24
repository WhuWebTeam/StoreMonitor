

/**
 * Router class of table EditResult list
 * @module editResultList
 * @since 1.0.0
 */
module.exports = app => {
	app.get('/api/v1/editResultList/index', 'editResultList.index');

	app.get('/api/v1/editResultList', 'editResultList.getAllEditResult'); // get all editResult
	app.post('/api/v1/editResultList', 'editResultList.addEditResult'); // add a new editResult record
}