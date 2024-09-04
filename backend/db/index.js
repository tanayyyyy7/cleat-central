import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.atlasUser}:${process.env.atlasPassword}@capstoneprojectcluster.dprw2.mongodb.net/?retryWrites=true&w=majority&appName=CapstoneProjectCluster`);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
};

export default connectToDB;