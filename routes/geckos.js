const express = require('express');
const router = express.Router();
const geckos = require('../controllers/geckos');
const catchAsync = require('../utils/catchAsync');
// const { isLoggedIn, isAuthor, validategecko } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

const Gecko = require('../models/gecko');

router.route('/')
    .get(catchAsync(geckos.index))

router.route('/new')
    .get(geckos.renderNewForm)
    .post(upload.array('image'), catchAsync(geckos.creategecko))

router.route('/:id')
    .get(catchAsync(geckos.showgecko))
    .put(upload.array('image'), catchAsync(geckos.updategecko))
    .delete(catchAsync(geckos.deletegecko));

router.get('/:id/edit', catchAsync(geckos.renderEditForm))

module.exports = router;