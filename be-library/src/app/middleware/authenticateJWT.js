const jwt = require('jsonwebtoken');

class authJWT{
    authenticateJWT(req, res, next) {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const accessToken = authHeader.split(' ')[1];
            jwt.verify(accessToken, process.env.ACCESS_TOKEN, (err, user) => {
                if (user) {
                    req.user = user;
                    next();
                }
                else {
                    res.send({message: err.message});
                }
            });
        }
        else {
            res.status(401);
        }
    }
    authenUserJWT(req, res, next) {
        const authHeader =  req.headers.authorization;
        if (authHeader) {
            const accessToken = authHeader.split(' ')[1];
            jwt.verify(accessToken, process.env.USER_ACCESS_TOKEN, (err, user) => {
                if (user) {
                    req.user = user;
                    next();
                }
                else {
                    res.send({message: err.message})
                }
            });
        }
        else {
            res.status(403);
        }
    }
}

module.exports = new authJWT;