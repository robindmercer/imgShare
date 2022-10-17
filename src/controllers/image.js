const path = require('path')
//const randomNumber = require('../helpers/libs')
const fs = require('fs-extra');
const md5 = require('md5');

const { Image, Comment } = require('../models/index');

const ctrl = {}

ctrl.index = async (req, res) => {
    const viewModel = {image:{}, comments:{}}
    // find directo
    const image2 = await Image.findOne({ _id: req.params.image_id });
    if (image2) {
        //console.log("Found Image");
        image2.views = image2.views + 1;
        await image2.save();
/*
    Hago lo mismo del renglon 15 porque si no en la pagina de detalle
    no me muestra los valores de los campos. (agrego .lean())
*/
        const image = await Image.findOne({ _id: req.params.image_id }).lean();
        viewModel.image= image;
        const comments = await Comment.find({ image_id: req.params.image_id }).lean();
        viewModel.comments= comments;
/*
    Este es el mismo ejemplo de find pero con like 
    const image = await Image.findOne({_id:{$regex: req.params.image_id}});
*/
        //res.render('image', { image, comments })
        res.render('image', viewModel)
    } else {
        console.log("NOT Found Image");
        res.redirect('/');
    }
}

ctrl.create = (req, res) => {
    const saveImage = async () => {
        const imgUrl = randomNumber();
        const images = await Image.find({ filename: imgUrl })
        if (images.length > 0) {
            saveImage()
        } else {
            const imageTempPath = req.file.path
            const ext = path.extname(req.file.originalname).toLocaleLowerCase();
            const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`)
            if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
                await fs.rename(imageTempPath, targetPath);
                await fs.remove(imageTempPath);
                const newImg = new Image({
                    title: req.body.title,
                    filename: imgUrl + ext,
                    description: req.body.description
                });
                const imageSaved = await newImg.save()                
                console.log('saveImage _id: ', imageSaved._id);
                //res.send('Ok');
                return res.redirect('/images/' + imageSaved._id);
            } else {
                await fs.unlink(imageTempPath);
                return res.status(500).json({ Error: 'Wrong type of file' })
            }
        }
    };
    saveImage()
}

ctrl.like = async (req, res) => {
    const image2 = await Image.findOne({ _id: req.params.image_id });
    if (image2) {
        image2.likes = image2.likes + 1;
        image2.save();
        res.json({likes: image2.likes})
    } else {
        res.status(500).json({error: 'Image not found'})
    }
}
// Video seccion 8
ctrl.comment = async (req, res) => {
    const image = await Image.findOne({ _id: req.params.image_id }).lean();
    console.log('req.body: ', req.body);
    //console.log('id',req.params.image_id)
    if (image) {
        const newComment = new Comment(req.body)
        newComment.gravatar = md5(newComment.email);
        newComment.image_id = image._id;
        await newComment.save()
        console.log('newComment: ', newComment);
        res.redirect('/images/' + image._id)

    }
    // console.log(req.body);
    // console.log(req.params.image_id);

}
ctrl.remove = async (req, res) => {
    console.log('remove _id: ',req.params.image_id );
    const image = await Image.findOne({ _id: req.params.image_id });
    if (image){
        await fs.unlink(path.resolve('./src/public/upload/'+ image.filename))
        await Comment.deleteOne({image_id: req.params.image_id})
        await image.remove()
        res.json(true);
    }
    //res.send('Delete Images')
}

function randomNumber() {
    const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
    // console.log('possible: ', possible);
    let randomNumber = ""
    for (let i = 0; i < 6; i++) {
        randomNumber += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return randomNumber;
}

module.exports = ctrl;