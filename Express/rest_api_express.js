const express = require('express')
const morgan = require('morgan');
const bodyParser = require('body-parser')
const http = require('http');
const hostname  = 'localhost';
const port = 3000

const dishRouter = require('./routers/dishRouter')
const promoRouter = require('./routers/promoRouter')
const leaderRouter = require('./routers/leaderRouter')

const app = express()
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use('/dishes', dishRouter)
app.use('/promotions', promoRouter)
app.use('/leaders', leaderRouter)
app.use(express.static(__dirname+ '/public'))


app.use((req,res,next) => {
       res.statusCode = 200
       res.setHeader('Content-Type','text/html')
       res.end('<html>'+ '<body>'+ '<h1>An alternate Home Page</h1>'+ '</body></html>')
});

const server = http.createServer(app)
server.listen(port, hostname, ()=> {
    console.log(`Running http server using express at http://${hostname}:${port}`)
});