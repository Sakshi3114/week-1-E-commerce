const express = require('express');
const {imageUploadUtils, upload} = require('../../helpers/cloudinary');
const {handleImageUpload,addProduct,fetchProducts,editProduct,deleteProduct} = require('../../controllers/admin/products-controller');

const router = express.Router();

router.post('/upload-image',upload.single('my_file'),handleImageUpload);
router.post('/add',addProduct);
router.get('/get',fetchProducts);
router.put('/edit/:id',editProduct);
router.delete('/delete/:id',deleteProduct);


module.exports = router;