const router = require('express').Router()

router.get('/', (req, res) => {
    res.render('pm2-services.ejs', {pageName:'pm2-services'})
})
router.get('/page1', (req, res) => {
    res.render('server-stats.ejs', {pageName:'server-stats'})
})

module.exports = router