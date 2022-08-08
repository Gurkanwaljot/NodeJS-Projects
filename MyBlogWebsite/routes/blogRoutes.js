const express = require('express')
const Blog = require('../models/blog')
const BlogController = require('../controllers/blogsController')

const router = express.Router()
 

router.get('/', BlogController.blog_index);

router.get('/create', BlogController.blog_create)

router.post('/', BlogController.blog_create_post)

router.get('/:id', BlogController.blog_details)

router.delete('/:id', BlogController.blog_delete)

module.exports =  router