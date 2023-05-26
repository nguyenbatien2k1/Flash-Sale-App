import mongoose from "mongoose";

async function connectDatabase() {
    try {
        await mongoose.connect('mongodb://localhost:27017/flash-sale');
        console.log('Connect DB Successfully!')

    } catch (error) {
        console.log('Connect DB Failed!')
    }
}

export default connectDatabase;