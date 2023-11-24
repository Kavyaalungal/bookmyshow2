import mongoose from "mongoose";
const schema = new mongoose.Schema({
    title:{
        type:String
    },
    category:{
        type:String
    },
    language:{
        type:String
    },
    description:{
        type:String
    },
    profile:{
        type:String
    }
});

export default mongoose.model.Films || mongoose.model("Film",schema);