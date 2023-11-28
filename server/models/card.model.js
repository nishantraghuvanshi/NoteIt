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
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
},{
    timestamps:true
});

const Card = mongoose.model('Note', cardSchema);

export default Card;