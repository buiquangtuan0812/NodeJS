const Account = require('../model/AccountModel');

class verifySignUp {
    checkDuplicate = (req, res, next) => {
        Account.findOne({
            username: req.body.username
        }).exec((err, user) => {
            if (err) {
                res.status(400).send({ message: err});
                return;
            }
            if (user) {
                res.status(400).send("Failed! Username is already in use!");
                return;
            }
            // Email
            Account.findOne({
                email: req.body.email
            }).exec((err, user) => {
                if (err) {
                    res.status(400).send({ message: err});
                    return;
                }
                if (user) {
                    res.status(400).send("Failed! Email is already in use!");
                    return;
                }
                next();
            });
        });
    }
}

module.exports = new verifySignUp;
