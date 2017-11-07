module.exports = app => {
    app.get('/api/v1/areas/index', 'areas.index');

    app.get('/api/v1/areas', 'areas.getAreas'); // get all areas info 
    app.get('/api/v1/areas/:areaId', 'areas.getAreaById'); // get info of some area specified by area id
    app.get('/api/v1/areas/:areaName', 'areas.getAreaByName'); // get info of some area specified by area name
    app.put('/api/v1/areas/:areaId', 'areas.modifyAreaById'); // modify info of some area specified by area id
    app.put('/api/v1/areas/:areaName', 'areas.modifyAreaByName'); // modify info of some area specified by area name
    app.post('/api/v1/areas', 'areas.addArea'); // add a new area info
}


// app.put('/api/v1/areas/:areaId', 'areas.modifyAreaById'); // modify info of some area specified by area id
// subset of area, means name and details can exists or not
// :areaId serial number of area
// {
//     name,
//     details
// }


// app.put('/api/v1/areas/:areaName', 'areas.modifyAreaByName'); // modify info of some area specified by area name
// subset of area, means name and details can exists or not
// :areaName name of area
// {
//     name,
//     details
// }


// app.post('/api/v1/areas', 'areas.addArea'); // add a new area info
// subset of area, id must exists
// :areaName name of area
// {
//     id,
//     name,
//     details
// }