const express = require('express');
const router = express.Router();
const { showHomepage, showUploads } = require('../controllers/pages-controller');
const multer = require('multer');
const upload = multer({ dest: 'tmp/' });
const fs = require('fs');


/* GET homepage. */
router.get('/', showHomepage)

/* GET showUploads.    */
router.get('/myupload', showUploads)



router.post('/myupload', upload.array('myfile', 3), function (req, res, next) {
  var error = false;
  var errorInfo = [];

  req.files.map((file) => {
    if (file.mimetype !== 'image/png' || file.size > 3 * 1000 * 1000) {
      if (file.mimetype !== 'image/png') {
        errorInfo.push("File ins't a PNG");
      } else {
        errorInfo.push("File has more than 3MB" );
      }
      error = true;
    } else {
      fs.rename(file.path, 'public/images/' + file.originalname, function (err) {
        if (err) {
          error = true;
          errorInfo.push(err);
        }
      });
    }
  });

  if (error === true) {
    var errors = `Errors during file upload: ${errorInfo.length}:<br/>`
    errorInfo.map((error) => {
      errors = errors + error + "<br/>";
    })
    res.send(errors);
  } else {
    res.send(`${req.files.length} files uploaded successfully`);
  }

});


module.exports = router;
