
// dependencies
const {createHmac} = require('crypto')

// module wrapper
const utilities = {}

utilities.parseJSON = (jsonStr) => {
    let jsonObj;

    try {
        jsonObj =   JSON.parse(jsonStr)
    } catch (error) {
        jsonObj = {}
    }

    return jsonObj;

}

utilities.hash = (str) => {
    const hash = createHmac('sha256', "kdfkdfkdfkdkfa").update(str) .digest('hex');
    return hash;
}

module.exports = utilities;