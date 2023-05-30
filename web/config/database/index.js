import mongoose from "mongoose";

async function connectDatabase() {
    try {
        await mongoose.connect('mongodb://mongo/flash-sale')
            .then(db => console.log('Database is connected to', db.connection.host))
            .catch(e => console.log(e))
    } catch (error) {
        console.log('Connect DB Failed!')
        console.log(error)
    }
}

export default connectDatabase;