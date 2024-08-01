const router = require('express').Router()
const servicesRouter = require('./services')

router.use('/services', servicesRouter)

module.exports = router