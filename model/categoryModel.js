const mongoose=require('mongoose');
const CategorySchema=new mongoose.Schema({
    categoryName:{
        type:String,
        required:true
    },
    subCategoryName:{
        type:String,
        required:true
    }
},
{
    timestamps:true,
    versionKey:false,
});
const CategoryModel=new mongoose.model('category_details',CategorySchema);
module.exports=CategoryModel;