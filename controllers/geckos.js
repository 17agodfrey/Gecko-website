const Gecko = require('../models/gecko');
const { cloudinary } = require("../cloudinary");

module.exports.index = async (req, res) => {
    const geckos = await Gecko.find({});
    res.render('geckos/index', { geckos })
}

module.exports.renderNewForm = (req, res) => {
    res.render('geckos/new');
}

module.exports.creategecko = async (req, res, next) => {
    const gecko = new Gecko(req.body.gecko);
    gecko.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    // gecko.author = req.user._id;
    await gecko.save();
    // console.log(gecko);
    // req.flash('success', 'Successfully made a new gecko!');
    res.redirect(`/geckos/${gecko._id}`)
}

module.exports.showgecko = async (req, res,) => {
    const gecko = await Gecko.findById(req.params.id)
    res.render('geckos/show', { gecko })
}

module.exports.renderEditForm = async (req, res) => {
    const gecko = await Gecko.findById(req.params.id)
    res.render('geckos/edit', { gecko })
}

module.exports.updategecko = async (req, res) => {
    try{
        const { id } = req.params;
        const gecko = await Gecko.findByIdAndUpdate(id, { ...req.body.gecko });
        console.log(req.files)
    
        // Check if new images are uploaded
        if (req.files) {
            const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
            // Update gecko images
            gecko.images.push(...imgs);
            await gecko.save();
        } 
    
        res.redirect(`/geckos/${gecko._id}`)
    } catch (err) {
        console.log(err)
        res.redirect('/error');
    }

}

module.exports.deletegecko = async (req, res) => {
    const { id } = req.params;
    await Gecko.findByIdAndDelete(id);
    // req.flash('success', 'Successfully deleted gecko')
    res.redirect('/geckos');
}

