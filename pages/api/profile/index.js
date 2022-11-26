import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  const { bio, email } = req.body;

  if (req.method === 'POST') {
    const profile = await prisma.profile.create({
      data: {
        bio: bio.bio,
        User: {
          connect: {
            email: email.email,
          },
        },
        userName: bio.userName,
      },
      image: bio.image,
    });

    res.status(201).json({ profile });
    res.status(200).json({ name: 'John Doe' });
  }
}
