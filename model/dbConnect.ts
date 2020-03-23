import mongoose from 'mongoose';

export const connect = function () {
    mongoose.connect('mongodb://localhost:27017/elasticDb', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then(() => {
        console.log("Mongodb connected")
    }).catch(err => {
        console.log(err.message)
    })

}
