
// set
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const { response } = require('express')
const blogRoutes =  require('./routes/blogRoutes')

//express app
const app = express()

//connect to mongodb
const dbURI = 'mongodb+srv://gurkanwaljot02:UFbalahar!02V@cluster0.jp9m3xj.mongodb.net/NodeJSCourse?retryWrites=true&w=majority'
mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((result) => {
        //listen for requests
        app.listen(3001)
    })
    .catch((err) => {
        console.log(err)
    })
// register view engine
app.set('view engine', 'ejs')

//middleware & static files
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
//morgan  middleware
app.use(morgan('dev'))

app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});

//
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog',
        snippet: 'about my new blog',
        body: 'more about my new blog'
    })

    blog.save()
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        });
});

app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        });
});

app.get('/single-blog', (req, res) => {
    Blog.findById('5ea99b49b8531f40c0fde689')
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
  });

app.get('/', (req, res) => {
    res.redirect('/blogs')
})

app.get('/about', (req, res) => {
    // res.send('<p> About Page </p>')
    res.render('about', {
        title: 'About'
    })
})

//redirects
app.use('/blogs',blogRoutes)
// 404 Page
//middleware function
app.use((req, res) => {
    res.status(404).render('404', {
        title: '404'
    })
})