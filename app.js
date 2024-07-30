const express = require('express')
const appRouter = require('./routes')
const uiRouter = require('./routes/ui')
const app = express()
const ip = require('ip')


app.set('view engine', 'ejs')
app.use(express.static('public'))

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', appRouter)
app.use('/', uiRouter)


app.listen(process.env.PORT, () => console.log(`Running App on http://${ip.address()}:${process.env.PORT}`))


