const mongoose = require('mongoose')
const Product = require('../models/productModel')

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 })
    res.status(200).json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    res.status(500).json({ error: 'Server Error' })
  }
}

// Create a new product
const createProduct = async (req, res) => {
  try {
    const userId = req.user._id

    // Basic validation for required fields
    const { title, category, description, price, stockQuantity, supplier } =
      req.body
    if (
      !title ||
      !category ||
      !description ||
      !price ||
      !stockQuantity ||
      !supplier
    ) {
      return res.status(400).json({ error: 'Please add all required fields' })
    }

    const newProduct = new Product({
      ...req.body,
      userId,
    })

    await newProduct.save()
    res.status(201).json(newProduct)
  } catch (error) {
    console.error('Error creating product:', error)

    // Return 400 for Mongoose validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message })
    }

    res.status(500).json({ error: 'Server Error' })
  }
}

// Get product by ID
const getProductById = async (req, res) => {
  const { productId } = req.params
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ error: 'No such product' })
  }

  try {
    const product = await Product.findById(productId)
    if (!product) {
      console.log('Product not found')
      return res.status(404).json({ message: 'Product not found' })
    }
    res.status(200).json(product)
  } catch (error) {
    console.error('Error fetching product:', error)
    res.status(500).json({ error: 'Server Error' })
  }
}

// Update product by ID
const updateProduct = async (req, res) => {
  const { productId } = req.params
  const userId = req.user._id // currently logged-in user

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ error: 'Invalid product ID' })
  }

  try {
    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    // Ownership check
    if (!product.userId.equals(userId)) {
      return res.status(404).json({ message: 'Product not found' }) // hide existence
    }

    // Update allowed fields
    Object.assign(product, req.body)
    await product.save()

    res.status(200).json(product)
  } catch (error) {
    console.error('Error updating product:', error)
    res.status(500).json({ error: 'Server Error' })
  }
}

// Delete product by ID
const deleteProduct = async (req, res) => {
  const { productId } = req.params
  const userId = req.user._id // currently logged-in user

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ error: 'Invalid product ID' })
  }

  try {
    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    // Ownership check
    if (!product.userId.equals(userId)) {
      return res.status(404).json({ message: 'Product not found' }) // hide existence
    }

    await product.deleteOne()
    res.status(204).send() // success, no content
  } catch (error) {
    console.error('Error deleting product:', error)
    res.status(500).json({ error: 'Server Error' })
  }
}

module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
}
