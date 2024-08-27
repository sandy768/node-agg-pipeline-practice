const mongoose=require('mongoose');
const ProductSchema=new mongoose.Schema({
    category_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"category_details"
    },
    productBrand:{
        type:String,
        required:true
    },
    model:{
        type:String,
        required:true
    },
    manufacturingYear:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    }
},
{
    timestamps:true,
    versionKey:false,
});
const ProductModel=new mongoose.model('product_details',ProductSchema);
module.exports=ProductModel;