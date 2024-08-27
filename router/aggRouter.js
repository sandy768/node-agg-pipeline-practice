const express=require('express');
const router=express.Router();
const {postCategoryDetails,postProductDetails,getProductCategory} = require('../controller/aggController');

router.post('/postcategory',postCategoryDetails);
router.post('/postProduct',postProductDetails);
router.get('/getproductcategory',getProductCategory);

module.exports=router;