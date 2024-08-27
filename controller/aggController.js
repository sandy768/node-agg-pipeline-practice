const CategoryModel=require('../model/categoryModel');
const ProductModel=require('../model/productModel');

const postCategoryDetails=async(req,res)=>{
    try{
        if(!req.body.categoryName){
            return res.status(401).json({
                success:false,
                message:"Category name is required",
            });
        }
        else if(!req.body.subCategoryName){
            return res.status(401).json({
                success:false,
                message:"Sub-category name is required",
            });
        }
        else{
            let categoryData=new CategoryModel({
                categoryName:req.body.categoryName.toLowerCase(),
                subCategoryName:req.body.subCategoryName.toLowerCase(),
            });
            let categoryDetails=await categoryData.save();
            console.log("Category details saved successfully");
            return res.status(200).json({
                success:true,
                message:"Category details saved successfully",
                status:200,
                categoryData:categoryDetails,
            });
        }
    }
    catch(err){
        console.log(err);
        return res.status(401).json({
            success:false,
            message:"Error to collect category data" +err,
        });
    }
}

const postProductDetails=async(req,res)=>{
    try{
        if(!req.body.category_id){
            return res.status(401).json({
                success:false,
                message:"Category Id is required",
            });
        }
        else if(!req.body.productBrand){
            return res.status(401).json({
                success:false,
                message:"Product brand is required",
            });
        }
        else if(!req.body.model){
            return res.status(401).json({
                success:false,
                message:"Model is required",
            });
        }
        else if(!req.body.manufacturingYear){
            return res.status(401).json({
                success:false,
                message:"Manufacturing year is required",
            });
        }
        else if(!req.body.quantity){
            return res.status(401).json({
                success:false,
                message:"Quantity is required",
            });
        }
        else{
            let productData=new ProductModel({
                category_id:req.body.category_id,
                productBrand:req.body.productBrand.toLowerCase(),
                model:req.body.model.toLowerCase(),
                manufacturingYear:req.body.manufacturingYear,
                quantity:req.body.quantity,
            });
            let productDetails=await productData.save();
            console.log("Product details saved successfully");
            return res.status(200).json({
                success:true,
                message:"Product details saved successfully",
                status:200,
                productData:productDetails,
            });
        }
    }
    catch(err){
        console.log(err);
        return res.status(401).json({
            success:false,
            message:"Error to collect product data" +err,
        });
    }
}
const getProductCategory=async(req,res,next)=>{
    try{
        let productCategory=await ProductModel.aggregate([
            {
                $lookup:{
                    from:'category_details',
                    localField:'category_id',
                    foreignField:'_id',
                    as:'ProductCategory'
                }
            },
            {
                $unwind:{
                    path:'$ProductCategory'
                }
            },
            {
                $project:{
                    category_id:0,
                    createdAt:0,
                    updatedAt:0,
                    "ProductCategory._id":0,
                    "ProductCategory.createdAt":0,
                    "ProductCategory.updatedAt":0
                }
            },
            {
                $merge:{
                    into:'product_category',
                    on:'_id'
                }
            },
        ]);
        return res.status(200).json({
            success:true,
            message:"Aggregated data replaced to 'product_category' collection successfully",
            status:200,
        });
    }
    catch(err){
        console.log(err);
        return res.status(401).json({
            success:false,
            message:"Error to replace aggregated data into 'product_category' collection" +err,
        });
    }
}
module.exports={
    postCategoryDetails,
    postProductDetails,
    getProductCategory
}