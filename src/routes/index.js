const express = require('express')
const router = express.Router();
const home = require('../controllers/home')
const image= require('../controllers/image')

module.export = app => {

    router.get('/',home.index);
    router.get('/',home.index);
    router.get('/images/:image_id',image.index);
    router.post('/images',image.create);
    router.post('/images/:image_id/like',image.like);
    router.post('/images/:image_id/comment',image.comment);
    router.delete('/images/:image_id',image.remove);
    
    return app.use(router);

};