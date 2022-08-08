const http = require('http')
const fs = require('fs')
const _ = require('lodash')

const server = http.createServer((req, res) => {
    //logs out reuqests made on the localhost
    // console.log(req.url, req.method)

    //lodash
    const num = _.random(0,20)
    console.log(num)
    const greet = _.once(() => {
        console.log('hello')
    })
    greet()
    greet()
    // set header content type
    res.setHeader('Content-Type', 'text/html')

    let path = './views/'
    switch (req.url) {
        case '/':
            path += 'index.html'
            res.statusCode = 200
            break
        case '/about':
            path += 'about.html'
            res.statusCode = 200
            break
        case '/about-me':
            res.statusCode = 301
            res.setHeader('Location', '/about')
            res.end()
            break
        default:
            path += '404.html'
            res.statusCode = 404
            break
    }
    //write content
    // res.write('<head><link rel="stylesheet href="#"> </head>')
    // res.write('<p>hello, gagan</p>')
    // res.write('<p>hello again, gagan</p>')

    //send an html file
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err)
            res.end()
        } else {
            res.end(data)
        }
    })
});

// function listens the request made on the localhost
server.listen(3001, 'localhost', () => {
    console.log('listening for requests on port 3001')
})