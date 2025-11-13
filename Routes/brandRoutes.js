const express=require('express')
const router=express.Router()
const brandController=require('../controllers/brandController')

router.post('/',brandController.createBrand)
router.get('/',brandController.getBrands)
router.get('/:id',brandController.getBrand)
router.put('/:id',brandController.updateBrand)
router.put('/del/:id',brandController.deleteBrand)
router.post('/login',brandController.brandLogin)

module.exports = router;