const express = require('express')
const {
  getAllProducts,
  getProductById,
  createProduct,
  // updateProduct,
  deleteProduct,
} = require('../controllers/productControllers')

const router = express.Router()

router.get('/', getAllProducts)
router.post('/', createProduct)
router.get('/:productId', getProductById)
// router.put('/:productId', updateProduct)
router.delete('/:productId', deleteProduct)

module.exports = router
