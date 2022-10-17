const ctrl = {}
const { Image } = require('../models/index')
const  sidebar = require('../helpers/sidebar')

ctrl.index = async (req,res) =>{
    const images = await Image.find().sort({ timestamp: 1 }).lean() // 1  = Ascendente -1 descendente
    let viewModel = { images:[]}
    viewModel.images = images;
    viewModel = await sidebar(viewModel)
    console.log('viewModel: ', viewModel);
    res.render('index',viewModel); 
    //res.render('index',{images: images}); 
    //res.render('index',{images});    
}

module.exports = ctrl;