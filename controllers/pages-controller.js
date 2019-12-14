const showHomepage = (req, res, next) => {
    res.render('homepage');
}

const showUploads = (req, res, next) => {
     res.render('uploads');
}

module.exports = { showHomepage, showUploads };