const express=require('express')
const router=express.Router()
router.post('/signup')
router.post('/login')
router.put('/resetpassword')
router.delete('/account')
router.get('/profile')
router.put('/profile_update')

module.exports = router;