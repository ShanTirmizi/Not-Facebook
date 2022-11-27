import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import { deleteImage } from '../../../utils/cloudinary';

// Delete post and cloudinary image
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.body;
  if (req.method === 'DELETE') {
    try {
      const post = await prisma.post.delete({
        where: {
          id: Number(id),
        },
      });
      // get the last part of the image url
      // ignore typescript error
      // @ts-ignore
      // remove .jpeg or png from the end of the image url
      // notFacebook/
      const image = post?.image.split('/').pop().split('.').shift();
      // Fetch the image from cloudinary using the image url
      // This needs fixing - it's not deleting the image
      // await cloudinary.uploader.destroy(image, {
      //   invalidate: true,
      //   resource_type: 'image',
      // });
      await deleteImage(image);
      res.status(200).json({ post });
    } catch (error) {
      res.status(400).json({ error });
    }
  }
  // const post = await prisma.post.findUnique({
  //   where: {
  //     id: Number(id),
  //   },
  // });
  // const deleteImage = await cloudinary.uploader.destroy(post?.image);
  // const deletePost = await prisma.post.delete({
  //   where: {
  //     id: Number(id),
  //   },
  // });
  // res.status(200).json({ deletePost, deleteImage });
}
