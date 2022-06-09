
// dependencies


// module wrapper

const handler = {}
handler.notFoundHandler = (reqProps, cb) => {
    console.log("This is a not found route");
    cb(404, 'This is a not found route')
}


//export 
module.exports = handler;