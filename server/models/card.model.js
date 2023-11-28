import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    
    },
    desc: {
        type: String,
        required: true,
        trim: true,    
    },
    tag: String,
},{
    timestamps:true
});

const Card = mongoose.model('Note', cardSchema);

export default Card;