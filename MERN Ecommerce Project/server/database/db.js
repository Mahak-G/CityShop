import mongoose from 'mongoose';

const Connection = async (URL) => {
        try{
        await mongoose.connect(URL,{useunifiedTopology:true , useNewUrlParser:true});
        console.log('database connected successfully');
    }
    catch(error){
        console.log('error while connecting database',error.message);
    }
}

export default Connection;