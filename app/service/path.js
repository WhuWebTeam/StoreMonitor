


const fs = require('fs');
const path = require('path');

module.exports = app => {
    class Path extends app.Service {

        // judge specified path exists or not and judge is a file or directory
        async pathExists(path) {
            return new Promise((resolve, reject) => {
                try {
                    fs.exists(path, exists => {

                        // exists, a file
                        if (exists && path.includes('.')) {
                            return resolve({
                                exists: true,
                                file: true
                            });
                        }
                        
                        // exists, a directory
                        if (exists) {
                            return resolve({
                                exists: true,
                                file: false
                            });
                        }

                        // doesn't exist
                        return resolve({
                            exists: false,
                            file: false
                        });
                    });
                } catch (err) {

                    // excetion, doesn't exists
                    return reject({
                        exists: false,
                        file: false
                    });
                }
            }).then(result => result).catch(result => result);
        }

        // create a directory specified by path
        async mkdir(path) {

            // directory specified by path exists
            const result = await pathExists(path);
            if (result.exists) {
                return;
            }

            // create father directory of directory specified by path
            let index = path.indexOf('/');
            const lastIndex = path.lastIndexOf('/');
            while (index !== lastIndex) {
                index = path.indexOf('/', index + 1);
                const tempPath = path.substring(0, index);

                // directory exists
                const result = await pathExists(temp);
                if (result.exists) {
                    continue;
                }

                new Promise((resolve, reject) => {
                    fs.mkdir(tempPath, err => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve();
                    });
                }).catch(err => {
                    throw err;
                });
            }

            // create directory specified by path
            new Promise((resolve, reject) => {
                fs.mkdir(path, err => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve();
                });
            }).catch(err => {
                throw err;
            });
        }

        // open some file specified by path
        async openFile(path, mode) {
            
            // file's father's path doesn't exists
            const fatherPath = path.substring(0, path.lastIndexOf('/'));
            await mkdir(fatherPath);
        
            return new Promise((resolve, reject) => {
                try {
                    fs.open(path, mode, (err, fd) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(fd);
                    });
                } catch (err) {
                    return reject(err);
                }
            }).then(fd => fd).catch(err => {
                throw err;
            });
        }
    }

    return Path;
}