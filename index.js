/*
play this: https://www.youtube.com/watch?v=d-diB65scQU

Sing along:

here's a little code I wrote, please read the README word for word, don't worry, you got this
in every task there may be trouble, but if you worry you make it double, don't worry, you got this
ain't got no sense of what is REST? just concentrate on learning Express, don't worry, you got this
your file is getting way too big, bring a Router and make it thin, don't worry, be crafty
there is no data on that route, just write some code, you'll sort it out… don't worry, just API…
I need this code, just don't know where, perhaps should make some middleware, don't worry, just API

Go code!
*/

const express = require('express')
const helmet = require('helmet')
const logger = require('./middleware/logger')
const app = express()

app.use(helmet())
app.use(express.json())
app.use(logger('short'))

const projectRouter = require('./data/routes/ProjectRouter')
const actionRouter = require('./data/routes/ActionRouter')

app.use('/api/projects', projectRouter)
app.use('/api/projects/:id/actions', actionRouter)


//global error handling.
app.use((req, res) => {
    res
        .status(404)
        .json({ message: "Route was not found. "})
})

app.use((err, req, res, next) => {
    console.log(err)
    res
        .status(500)
        .json({ message: "An internal error occurred." })
})


//host/port/listener configuration
const port = process.env.PORT || 8080
const host = process.env.HOST || "127.0.0.1"

app.listen(port, host, () => {
    console.log(`Server running on ${host}:${port}`)
})