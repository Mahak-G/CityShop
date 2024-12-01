import Product from '../model/product-schema.js';

export const enterProduct = async (request,response) => {
    //backend api: callback function
    try{
        const data = request.body;
        const newProduct = new Product(data);
        await newProduct.save();

        response.status(200).json({ mesage: data });
    }catch(error){
        response.status(500).json({ message: error.message });
        //500:internal server error
    }
}