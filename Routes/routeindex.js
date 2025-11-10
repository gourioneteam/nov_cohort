
const express=require('express')
const router=express.Router()
const brandRoutes=require('./brandRoutes')
const categoryRoutes=require('./categoryRoutes')
const productRoutes=require('./productRoutes')
const userRoutes=require('./userRoutes')

router.use('/brand',brandRoutes)
router.use('/category'.categoryRoutes)
router.use('/product',productRoutes)
router.use('/user',userRoutes)

module.exports = router;