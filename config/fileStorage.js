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
  params: async (req, file) => ({
    folder: 'UserAvatars',
    allowed_formats: ['jpg', 'png', 'jpeg', 'gif', 'webp'],
    public_id: `${Date.now()}-${file.originalname}`,
  }),
});

const upload = multer({ storage });


const deleteImgCloudinary = async (imgUrl) => {
  const parts = imgUrl.split('/');
  const fileName = parts.at(-1).split('.')[0];
  const folder = parts.at(-2);
  const public_id = `${folder}/${fileName}`;

  return await cloudinary.uploader.destroy(public_id);
};

export { upload , deleteImgCloudinary };


