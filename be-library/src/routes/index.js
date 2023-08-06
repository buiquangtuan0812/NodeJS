const AccountRouter = require('./AccountRoute');
const AdminRouter = require('./AdminRoute');
const BookRouter = require('./BookRoute');
const BlogRouter = require('./BlogRoute');
const CmtBookRouter = require('./CmtBookRoute');
const CartRouter = require('./CartRoute');
const OrderRouter = require('./OrderRoute');

function route(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    })
    app.use('/user', AccountRouter);
    app.use('/admin', AdminRouter);
    app.use('/users/cmt', CmtBookRouter);
    app.use('/users/order', OrderRouter);
    app.use('/users/cart', CartRouter);
    app.use('/library/blogs', BlogRouter);
    app.use('/library/books', BookRouter);
    // app.use('/library/authors', authorRouter);
}

module.exports = route;