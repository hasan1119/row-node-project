// dependencies
const url = require('url');
const routes = require('./../routes');
const {
    notFoundHandler
} = require('../handlers/notFoundHandler');
const data = require('./lib/data');

// module wrapper
const handler = {}

const content = {
    name: "javascript",
}



handler.reqResHandler = (req, res) => {
    const method = req.method.toLowerCase();
    const headerObj = req.headers;
    const reqUrlObj = url.parse(req.url, true);
    const path = reqUrlObj.pathname;
    const formatedPath = path.replace(/^\/+|\/+$/g, '');
    const queryObj = reqUrlObj.query;
    const acceptableContentType = ["application/json", "text/plain"];
    let body = '';


    if (acceptableContentType.includes(headerObj["content-type"])) {
        const rawDataArray = []
        req.on("data", (buffer) => {
        
            rawDataArray.push(buffer);
        })

        req.on('end', () => {
            body += Buffer.concat(rawDataArray).toString()
         
            const reqProps = {
                method,
                headerObj,
                reqUrlObj,
                path,
                formatedPath,
                queryObj,
                body
            }

            const chosenHandler = routes[formatedPath] ? routes[formatedPath] : notFoundHandler;

            chosenHandler(reqProps, (statusCode, body) => {
                statusCode = typeof (statusCode) === 'number' ? statusCode : 500;
                body = typeof (body) === "object" ? body : {};

                res.writeHead(statusCode, {
                    "content-type": "application/json"
                });
                res.write(JSON.stringify(body))
                res.end()
            })

        })

    } else {
        res.end("Content type is not acceptable")
    }

}

module.exports = handler;