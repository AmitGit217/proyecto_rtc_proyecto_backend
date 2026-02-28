import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    api_key: process.env.CLOUDINARY_API_KEY
})


const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'UserAvatars',
    allowedFormats: ['jpg', 'png', 'jpeg', 'gif', 'webp']
  },
});

const upload = multer({ storage });


const deleteImgCloudinary = (imgUrl) => {

    const imgSplited = imgUrl.split('/')
    const nameSplited = imgSplited.at(-1).split('.')[0]
    const folderSplited = imgSplited.at(-2);
    const public_id = `${folderSplited}/${nameSplited}`;

    cloudinary.uploader.destroy(public_id, () => {
        console.log('Image delete in cloudinary')
    })
}

export { upload , deleteImgCloudinary };


