/**
 * enclosure of file and directory's opration
 * realize judge a path exists or not and this path stand for file or directory,
 * create directory with the father directory of the directory specified by path doesn't exist,
 * open a file whoes father directory doesn't exist
 * @module path
 * 
 * @file StoreMonitor
 * @version 0.0.1
 */


const fs = require('fs');

/** path */
module.exports = app => {
    /**
     * used to complete module path's function
     * @class
     * @extends app.Service
     */
    class Path extends app.Service {

        /**
         * judge specified path exists or not and judge is a file or directory
         * @public
         * @function pathExists
         * @param {string} path - file or directory's path waited to judge
         * @return {Promise<Object>} 
         * object with exists is true, file is true when path is a file and exists
         * object with exists is ture, file is false when path is a directory and exists
         * object with exists is false, file is false when path doesn't exists
         */
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
                } catch(err) {

                    // excetion, doesn't exists
                    return reject({
                        exists: false,
                        file: false
                    });
                }
            }).then(result => result).catch(result => result);
        }


        /**
         * create a directory specified by path, maybe directory's father directory doesn't exist
         * will throw exception when opration error
         * @public
         * @function mkdir
         * @param {string} path - path of directory waited to be created
         * @return {Promise<>} do not return value
         */
        async mkdir(path) {
            // directory specified by path exists
            const result = await this.pathExists(path);
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
                const result = await this.pathExists(tempPath);
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
                    // throw err;
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
                // throw err;
            });
        }


        /**
         * open some file specified by path, maybe file's father directory's path doesn't exist
         * will throw Exception when opration error
         * @public
         * @function openFile
         * @param {string} path - path of file waited to be open 
         * @param {string} mode - mode of opnning file
         * @return {Promise<int>} the file description of file opened
         */
        async openFile(path, mode) {
            
            // file's father's path doesn't exists
            const fatherPath = path.substring(0, path.lastIndexOf('/'));
            await this.mkdir(fatherPath);
        
            return new Promise((resolve, reject) => {
                try {
                    fs.open(path, mode, (err, fd) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(fd);
                    });
                } catch(err) {
                    return reject(err);
                }
            }).then(fd => fd).catch(err => {
                // throw err;
            });
        }


        async writeFile(path, content, mode) {

            // file's father directory exists or not
            const fatherPath = path.substring(0, path.lastIndexOf('/'));
            await this.mkdir(fatherPath);

            return new Promise((resolve, reject) => {
                try {
                    fs.writeFile(path, content, mode, err => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve();
                    });
                } catch(err) {
                    reject (err);
                }
            }).then(() => {}).catch(err => {
                // throw err;
            });
        }
        

        async appendFile(path, content) {

            const fatherPath = path.substring(0, path.lastIndexOf('/'));
            await this.mkdir(fatherPath);

            return new Promise((resolve, reject) => {
                try {
                    fs.appendFile(path, content, err => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve();
                    });
                } catch(err) {
                    return reject(err);
                }
            }).then(() => {}).catch(err => {
                throw err;
            });
        }
    }

    return Path;
}