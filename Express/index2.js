const express = require('express')
const morgan = require('morgan')

const http = require('http');
const hostname  = 'localhost';
const port = 3000
const app = express()

app.use(morgan('dev'));

app.use(express.static(__dirname+ '/public'));

app.use((req,res,next) => {
       res.statusCode = 200
       res.setHeader('Content-Type','text/html')
       res.end('<html>'+ '<body>'+ '<h1>A simple Express Server</h1>'+ '</body></html>')
});



const server = http.createServer(app)

server.listen(port, hostname, ()=> {
    console.log(`Running http server using express at http://${hostname}:${port}`)
});