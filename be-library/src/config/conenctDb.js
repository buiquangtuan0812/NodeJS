const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

async function connect() {
    try {
        await mongoose.connect("mongodb://localhost:27017/db_library", {
            useNewUrlParser: true,
        });

        console.log("Successfully connected!");
    }
    catch(err) {
        console.log(err);
    }
}

module.exports = {connect};