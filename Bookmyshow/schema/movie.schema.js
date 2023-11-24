import mongoose from "mongoose";
const Schema = new mongoose.Schema({
    title:{
        type:String,
    },
    filename:{
        type:String,
        
    },

    
});
export default mongoose.model.Movies || mongoose.model("Movie",Schema);