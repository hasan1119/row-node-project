
// dependencies
const path = require('path')
const fs = require('fs')

// module wrapper

const data = {};

data.basedir = path.join(__dirname, '../../.data/');



data.create = (dir, file, content, callback) => {
    fs.open(path.join(data.basedir, dir, file + '.json'), "wx", (err, fd) => {
        if (!err && fd) {
            
            fs.writeFile(fd, content, (err) => {
                if (!err) {
                    fs.close(fd, (err) => {
                        if (!err) {
                            callback(null)
                        } else {
                            callback(err)
                        }
                    } )
                } else {
                    callback(err)
                }
            })

        } else {
            callback(err)
        }

    } )
}

data.read = (dir, file, callback) => {
    fs.open(path.join(data.basedir, dir, file + '.json'), "r", (err, fd) => {
        if (!err && fd) {
            fs.readFile(fd, 'utf-8', (err, content) => {
                if (!err && content) {
                    fs.close(fd, (err) => {
                        if (!err) {
                            callback(err, content)
                        } else {
                            callback(err)
                        }
                    })
                } else {
                    callback(err)
                }
            })
        } else {
            callback(err)
        }
    })
}

data.update = (dir, file, content, callback) => {
    fs.open(path.join(data.basedir, dir, file + '.json'), "r+", (err, fd) => {
        if (!err && fd) {
            fs.ftruncate(fd, (err) => {
                if (!err) {
                    fs.writeFile(fd, content, (err) => {
                        if (!err) {
                            fs.close(fd, (err) => {
                                if (!err) {
                                    callback(null)
                                } else {
                                    callback(err)
                                }
                            })
                        } else {
                            callback(err)
                        }
                    })
                } else {
                    callback(err)
                }
            })
        } else {
            callback(err)
        }
    
    })
}

data.deleteFile = (dir, file, callback) => {
    fs.unlink(path.join(data.basedir, dir, file + '.json'), (err) => {
        if (!err) {
            callback(null)
        } else {
            callback(err)
        }
    })
}


module.exports = data;