const router = require('express').Router()
const requestLogger = require('../middleware/requestLogger')
const { getServicesController, restartServiceController, startServiceController, stopServiceController } = require('./controller')

router.use(requestLogger)

router.post('/services/:id/restart', restartServiceController)
router.post('/services/:id/start', startServiceController)
router.post('/services/:id/stop', stopServiceController)
router.get('/services', getServicesController)

module.exports = router