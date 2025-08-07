import multer from 'multer'

import {CloudinaryStorage} from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'Accessitheque',
        resource_type: 'auto',
         allowed_formats: ['jpeg', 'gif', 'jpg', 'webp', 'avif', 'png', 'pdf', 'epub', 'mp3', 'wav', 'mp4', 'mov', 'txt']
    }
})

const upload = multer({storage})
export default upload;