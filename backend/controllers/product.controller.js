import Product from "../models/Product.model.js"; 
import mongoose from 'mongoose';

export const getProducts = async (req, res) => {
    try{
        const products = await Product.find({});
        res.status(200).json({
            success: true,
            data: products
        })
    } catch(error){
        console.error("Error in Fetching Products", error.message)
        res.status(500).json({
            success:false,
            message: "Server Error"
        })
    }
};

export const createProduct = async (req, res) => {
    const product = req.body;

    if (!product.name || !product.price || !product.image){
         return res.status(400).json({
            success:false,
            message: "Please provide all fields"
         })
    }

    const newProduct = new Product(product)

    try{
        newProduct.save(); 
        res.status(201).json({
            success : true,
            data: newProduct
        })
    } catch(error){
        console.error("Error in Create Prouduct", error.message)
        res.status(500).json({
            success:false,
            message: "Server Error"
        })
    }
}

export const updateProduct = async (req, res) => {
    const {id} = req.params;
    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No product with id: ${id}`);
    }
    try{
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
        res.status(200).json({
            success: true,
            data: updatedProduct
        })
    } catch(error){
        console.error("Error in Updating Product", error.message)
        res.status(500).json({
            success:false,
            message: "Server Error"
        })
    }
}


export const deleteProduct = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No product with id: ${id}`);
    }
    try{
        const product = await Product.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Product is deleted"
        })
    } catch(error){
        console.error("Error in Delete Product", error.message)
        res.status(500).json({
            success: false,
            message: "Server Error"
        })
    }
}
