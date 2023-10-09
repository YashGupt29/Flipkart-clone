import mongoose from "mongoose";
const connection = async (url) => {
  // const URL = `mongodb+srv://${username}:${password}@cluster0.8ovdjsi.mongodb.net/?retryWrites=true&w=majority`;
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("MongoDb successfully connected");
  } catch (error) {
    console.log("Error while connecting to Database", error.message);
  }
};
export default connection;
