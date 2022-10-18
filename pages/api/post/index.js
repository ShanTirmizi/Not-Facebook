import prisma from '../../../lib/prisma';
export default async function handle(req, res) {
  const { title, content, email } = req.body;
  const post = await prisma.post.create({
    data: {
      title,
      content,
      User: {
        connect: {
          email: email,
        },
      },
    },
  });
  res.status(201).json({ post });
}
