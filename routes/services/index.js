const router = require('express').Router()
const { getServicesController, restartServiceController, startServiceController, stopServiceController } = require('./controller')

router.post('/:id/restart', restartServiceController)
router.post('/:id/start', startServiceController)
router.post('/:id/stop', stopServiceController)
router.get('/', getServicesController)

module.exports = router