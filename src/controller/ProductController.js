import { createProductService, updateProductService } from "../service/ProductService.js";


export const createProductController = async (req, res) => {
    try{
       const {name, image, type, countInStock, price, rating, description} = req.body;
       if(!name || !image || !type || !countInStock || !price || !rating ){
        return res.status(404).json({
            status:"ERORR",
            message:"The input required"
        })
       }
       const respon = await createProductService(req.body)
        return res.status(200).json(respon)

    }catch(e){
        return res.status(500).json({
            message: e.message
        })
    }
}


export const updateProductController = async (req, res) => {
    try{
       const prdId = req.params.id;
       const prdData = req.body;
       if(!prdId){
        return res.status(404).json({
            status:"ERROR",
            message:"The prdID is required"
        })
       }
       const respon = await updateProductService(prdId, prdData);
        return res.status(200).json(respon)

    }catch(e){
        return res.status(500).json({
            message: e.message
        })
    }
}





