import mongoose from "mongoose";

async function connectionInDatabase() {
  
    mongoose.connect(process.env.DATABASE_STRING_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Connection failed: ', err));

    return mongoose.connection;
};

export default connectionInDatabase;
