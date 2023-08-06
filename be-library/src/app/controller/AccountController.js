const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Account = require('../model/AccountModel');
const Admin = require('../model/AdminModel');
let refreshTokens = [];

class AccountController {

    // Create a new user
    createUser(req, res) {
        const data = req.body;
        const user = new Account({
            username: data.username,
            email: data.email,
            imgDes: 'https://fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg',
            tel: data.tel,
            coin: 0,
            cart: [],
            bill: [],
            birthDate: '',
            address: '',
            fullName: '',
            role: "User",
            password: bcrypt.hashSync(data.password, 8), // hash password
        })
        const token = jwt.sign({
            user_id: user._id,
            email: user.email,
            username: user.username
        }, process.env.TOKEN_KEY);
        user.token = token;
        user.save((err, user) => {
            if (!err) {
                res.status(200).send(token);
            }
            else {
                res.status(500).send({message: err.message});
            }
        })
    }

    // Login by account user
    signin(req, res, next) {
        Account.findOne({username: req.body.username})
            .then(user => {
                const password = user.password;
                const isValidPassword = bcrypt.compareSync(req.body.password, password);
                if (isValidPassword) {
                    const accessToken = jwt.sign({username: user.username, role: user.role, _id: user._id}, process.env.USER_ACCESS_TOKEN);
                    const refreshToken = jwt.sign({username: user.username, role: user.role, _id: user._id}, process.env.REFRESH_TOKEN);
                    refreshTokens.push(refreshToken);
                    res.send({
                        _id: user._id,
                        username: user.username,
                        email: user.email,
                        imgDes: user.imgDes,
                        fullName: user.fullName,
                        address: user.address,
                        tel: user.tel,
                        role: user.role,
                        cart: user.carts,
                        birthDate: user.birthDate,
                        bill: user.bill,
                        coin: user.coin,
                        orders: user.orders,
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                        create_at: user.create_at
                    });
                    
                }
                else {
                    res.send({message: "Password is incorrect !"});
                }
            })
            .catch(next=> {
                Admin.findOne({name:  req.body.username})
                    .then((admin) => {
                        const compare = bcrypt.compareSync(req.body.password, admin.password);
                        if (compare) {
                            const accessToken = jwt.sign({name: admin.name, role: admin.role}, process.env.ACCESS_TOKEN);
                            res.send({
                                role: admin.role,
                                name: admin.name,
                                imgDes: admin.imgDes,
                                accessToken: accessToken,
                                fullName: admin.fullName,
                            });
                        }
                        else {
                            res.send({message: 'Password is incorrect !'});
                        }
                    })
                    .catch(next => {
                        res.send({message: "Username is not exsit !"});
                    })
            });
    }

    logout(req, res, next) {
        const {token} = req.body;
        refreshTokens = refreshTokens.filter(t => t !== token);
        res.send({message: "Logged out successfully!"});
    }

    // Delette a account user
    deleteAccount(req, res, next) {
        Account.deleteOne({_id: req.body._id})
            .then(success => {
                res.send({message: "Deleted successfully!"});
            })
            .catch(next);
    }

    // Update profile

    updateProfile(req, res, next) {
        Account.updateOne({_id: req.user._id}, req.body)
            .then((user) => {
                res.status(200).send(user);
            })
            .catch((err) => {
                res.send(err);
            })
            .catch(next);
    }

    // Update password

    async updatePassword(req, res, next) {
        const newPassword = req.body.newPassword;
        const oldPassword = req.body.oldPassword;
        try {
            const user = await Account.findById(req.user._id);
            const isValidPassword = bcrypt.compareSync(oldPassword, user.password);
            if (isValidPassword) {
                const hashedPassword = await bcrypt.hash(newPassword, 8);
                await Account.findOneAndUpdate(
                    { _id: req.user._id },
                    { $set: { password: hashedPassword } }
                );
                return res.status(200).send({ message: 'Password updated successfully!' });
            }
            else {
                return res.status(401).send({ message: 'Invalid password!' });
            }

        }
        catch (error) {
            return res.status(500).send({ message: 'Internal server error!', error });
        }
    }
};

module.exports = new AccountController;