module.exports = {
    mutipleMongooseObjects: function(mongooses) {
        return mongooses.map(mongoose=>mongoose.toObject());
    },
    monoMongooseObjects: function(mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    }
}