import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import { uploadImage } from '../../../utils/cloudinary';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, content, user, image } = req.body;
  // const getImage = await cloudinary.uploader.upload(image, {
  //   foler: 'posts',
  //   width: 400,
  //   height: 300,
  //   crop: 'fill',
  // });
  const getImage = await uploadImage(image);
  const post = await prisma.post.create({
    data: {
      title,
      content,
      User: {
        connect: {
          email: user.email,
        },
      },
      // @ts-ignore
      image: getImage.secure_url,
    },
  });
  res.status(201).json({ post });
}
