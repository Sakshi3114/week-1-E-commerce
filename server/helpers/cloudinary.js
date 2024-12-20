const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
    cloud_name : 'djewv4hgx',
    api_key : '457818865242999',
    api_secret: '-inM4zWZkWVC63rG1veW9P_vVrk' ,
});

const storage = new multer.memoryStorage();

async function imageUploadUtils(file){
    const result  = await cloudinary.uploader.upload(file,{
        resource_type : 'auto'
    });

    return result;
}

const upload = multer({storage});
module.exports = {upload, imageUploadUtils}

