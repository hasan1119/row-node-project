// dependencies

const {
    create,
    read,
    update,
    deleteFile
} = require("../helpers/lib/data")
const {
    parseJSON,
    hash
} = require("../helpers/lib/utilities")


// module wrapper

const handler = {}
handler.usersRouteHandler = (reqProps, cb) => {
    const acceptableMethods = ['get', 'post', 'put', 'delete']

    if (acceptableMethods.includes(reqProps.method)) {

        handler._users[reqProps.method](reqProps, cb)

    } else {
        cb(400, {
            err: "There was a problem in your request"
        })
    }

}

handler._users = {}

// getting info about users
handler._users.get = (reqProps, cb) => {
    const body = parseJSON(reqProps.body)
    const phone = typeof (body.phone) === "string" && body.phone.trim().length === 11 ? body.phone.trim() : false;

    const password = typeof (body.password) === "string" && body.password.trim().length > 8 ? body.password.trim() : false;

    if (phone && password) {
        read('users', phone, (err, u) => {
            const userInfo = parseJSON(u);
            const hashedPassword = hash(password);
            if (hashedPassword === userInfo.password) {
                delete userInfo.password;
                cb(200,userInfo )

            } else {
                cb(400, {
                    error : "you have provided a wrong password!"
                })
            }
        })

    } else {
        cb(400, {
            err: "you have a problem in your requested info"
        })
    }

}

// create a new user
handler._users.post = (reqProps, cb) => {
    const body = parseJSON(reqProps.body)

    const firstName = typeof (body.firstName) === "string" && body.firstName.trim().length > 0 ? body.firstName.trim() : false;

    const lastName = typeof (body.lastName) === "string" && body.lastName.trim().length > 0 ? body.lastName.trim() : false;

    const age = typeof (body.age) === "number" && body.age > 0 ? body.age : false;

    const phone = typeof (body.phone) === "string" && body.phone.trim().length === 11 ? body.phone.trim() : false;

    const password = typeof (body.password) === "string" && body.password.trim().length > 8 ? body.password.trim() : false;


    if (firstName && lastName && age && phone && password) {
        const user = {
            firstName,
            lastName,
            age,
            phone,
            password: hash(password)
        }

        create("users", phone, JSON.stringify(user), (err) => {
            if (!err) {
                cb(200, {
                    message: "User was created successfully"
                })
            } else {
                cb(500, {
                    err: "There was a problem in the server side"
                })
            }
        })



    } else {
        cb(400, {
            err: "you have a problem in your requested info"
        })
    }




}


handler._users.put = (reqProps, cb) => {
    const body = parseJSON(reqProps.body)

    const firstName = typeof (body.firstName) === "string" && body.firstName.trim().length > 0 ? body.firstName.trim() : false;

    const lastName = typeof (body.lastName) === "string" && body.lastName.trim().length > 0 ? body.lastName.trim() : false;

    const age = typeof (body.age) === "number" && body.age > 0 ? body.age : false;

    const phone = typeof (body.phone) === "string" && body.phone.trim().length === 11 ? body.phone.trim() : false;

    const password = typeof (body.password) === "string" && body.password.trim().length > 8 ? body.password.trim() : false;


    if (firstName || lastName || age || password  &&  phone) {
        read('users', phone, (err, u) => {
            if (!err && u) {
                const userInfo = parseJSON(u);
                if (firstName) {
                    userInfo.firstName = firstName;
                }

                if (lastName) {
                    userInfo.lastName = lastName
                }

                if (age) {
                    userInfo.age = age
                }

                if (password) {
                    userInfo.password = hash(password)
                }

                update('users', phone, JSON.stringify(userInfo), (err) => {
                    if (!err) {
                        cb(200, {
                           message: "your info has been updated"
                        })
                    } else {
                        cb(500, {
                            error: "server side error"
                        })
                    }
                })

            } else {
                cb(500, {
                    err: "Server side err"
                })
           }

        })




    } else {
        cb(400, {
            err: "you have a problem in your requested info"
        })
    }

}


handler._users.delete = (reqProps, cb) => {
    const body = reqProps.queryObj
    const phone = typeof (body.phone) === "string" && body.phone.trim().length === 11 ? body.phone.trim() : false;
console.log(body);
    if (phone) {
        
        deleteFile('users', phone, (err) => {
            if (!err) {
                cb(200, {message: "successfully deleted"})
            } else {
                cb(500, {err: "server error"})
            }
        })

    } else {
        cb(400, {
            err : "request problem"
        })
    }
}



//export 
module.exports = handler;