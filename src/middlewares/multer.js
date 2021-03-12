const multer = require('multer');
const {join, extname} = require('path');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const avatarRoutesArray = ['/registro','/perfil'];
        const milanesa = avatarRoutesArray.includes(req.url) ? ['public','images','avatars'] : ['public','images'];
        cb(null, join(__dirname,'../../', ...milanesa));
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname} - ${Date.now()}${extname(file.originalname)}`);
    },

})

module.exports =  multer({storage});