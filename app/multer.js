const multer = require('multer');
const path = require('path');

// Setting up storage
const storage = multer.diskStorage({
    destination: function(req,file,cb){
      cb(null,'./public/uploads')  
    },
    filename: function(req, file, cb){
      cb(null, file.originalname.split(".")[0] + '-' + Date.now() + path.extname(file.originalname));
    }
  });

const upload = multer({
    storage: storage,
    limits: {
      fieldSize: 300*1024*1024
    },
    fileFilter: function(req,file,cb){
      checkFileTypes(file,cb);
    }
});

const uploadImage = multer({
  storage: storage,
  limits: {
    fieldSize: 10*1024*1024
  },
  fileFilter: function(req,file,cb){
    checkImageType(file,cb);
  }
})

function checkImageType(file,cb){
  const allowedTypes = /jpeg|jpg|png|gif/;
  const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = allowedTypes.test(file.mimetype);

  if(mimeType && ext){
    cb(null,true);
  } else {
    cb(new Error('Error: Only Images!!'),false);
  }
}

// Check File Type
function checkFileTypes(file,cb){
    // Allowed extensions
    const fileTypes = /mp4|mpeg|m4v|avi|mpg|webm|jpeg|jpg|png|gif/;
    // const fileTypes = /jpeg|jpg|png|gif/;
    
    // Check extensions
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    // Check mimetypes
    const mimetype = fileTypes.test(file.mimetype);
  
    if(mimetype && extname){
      cb(null,true);
    } else {
      cb(new Error('Error: Videos Only!!'),false);
    }
  }

module.exports = {
  upload: upload,
  uploadImage: uploadImage,
};