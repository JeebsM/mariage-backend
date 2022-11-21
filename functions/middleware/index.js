const admin = require("../config/firebase-config");

class Middleware {
    decodeToken(req, res, next) {
        const token = req.get('authorization');
        //console.log(req.get('authorization'));
        //console.log("request userToken", token);
        try {
            admin.auth()
                .verifyIdToken(token)
                .then((decodedToken) => {
                    //console.log("decodedToken", decodedToken);
                    return next();
                })
                .catch((e) => {
                    return res.json({
                        message: `Unauthorized: ${e.message}`
                    });
                });;
        } catch(e) {
            return res.json({
                message: `Internal error: ${e.message}`
            });
        }
    }
}

module.exports = new Middleware();