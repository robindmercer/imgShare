const path = require('path');
const exphbs = require('express-handlebars');
const morgan = require('morgan')
const multer = require('multer');

const express = require('express')
const errorHandler = require('errorhandler');
const routes = require('../routes/index');
const home = require('../controllers/home')
const image= require('../controllers/image')

const { PORT } = process.env;
module.exports = app => {
    //setting 
    app.set('port', process.env.PORT || 3001)
    app.set('views', path.join(__dirname, '../views'));
    app.engine(
        '.hbs',
        exphbs({
            defaultLayout: 'main',
            layoutsDir: path.join(app.get('views'), 'layouts'),
            partialsDir: path.join(app.get('views'), 'partials'),
            extname: '.hbs',
            helpers: require('./helpers')
        })
    );
    app.set('view engine', '.hbs')
    // middlewares
    app.use(morgan('dev'))
    app.use(multer({ dest: path.join(__dirname, '../public/upload/temp') }).single('image'))
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    //routes
     app.get('/',home.index);
     app.get('/images/:image_id',image.index);
     app.post('/images',image.create);
     app.post('/images/:image_id/like',image.like);
     app.post('/images/:image_id/comment',image.comment);
     app.delete('/images/:image_id',image.remove);
//  routes(app)  no funciona esto 
    // static files 
    app.use('/public',express.static(path.join(__dirname,'../public')));
    //errorHandlers
    if (app.get('env')=== 'development' ){
        app.use(errorHandler)
    }
    return (app);
}