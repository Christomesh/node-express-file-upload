const express = require("express")
const router = express.Router()

const {createProduct, getAllProducts} = require("../controllers/productController")
const {uploadsProductImageLocal} = require("../controllers/uploadsController")

router.route('/').post(createProduct).get(getAllProducts)
router.route('/uploads').post(uploadsProductImageLocal)

module.exports = router