const router = require('express').Router()
const useradRouter = require('./userad')
const productRouter = require('./products')

router.use(useradRouter)
router.use(productRouter)

module.exports = router