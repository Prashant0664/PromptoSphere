import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);
  if(isConnected) {
    //console.log('MongoDB is already connected');
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "NExtProject1",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    isConnected = true;
    //console.log('MongoDB connected succesfully')
  } catch (error) {
    //console.log(error,"erroir in database connection");
  }
}