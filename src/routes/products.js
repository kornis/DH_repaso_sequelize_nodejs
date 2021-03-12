const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middlewares/multer');

router.get('/', productController.index);
router.get('/:id', productController.editForm);
router.get('/borrar-imagen/:id', productController.deleteImage);
router.post('/:id', upload.any(), productController.edit);
router.get('/nuevo', productController.createForm);
router.post('/nuevo', upload.any(),productController.create);

module.exports = router;