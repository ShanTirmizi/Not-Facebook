import prisma from '../../../lib/prisma';
import cloudinary from '../../../utils/cloudinary';
export default async function handle(req, res) {
  const { title, content, email, image } = req.body;
  const getImage = await cloudinary.uploader.upload(image, {
    foler: 'posts',
    width: 400,
    height: 300,
    crop: 'fill',
  });
  const post = await prisma.post.create({
    data: {
      title,
      content,
      User: {
        connect: {
          email: email,
        },
      },
      image: getImage.secure_url,
    },
  });
  res.status(201).json({ post });
}
