// write a prisma fucntion to create a post

// import prisma from 'lib/prisma';
import { PrismaClient } from '@prisma/client';
// import { unstable_getServerSession } from 'next-auth/next';
// import { authOptions } from '../auth/[...nextauth]';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { bio, email } = req.body;

  // const session = await unstable_getServerSession(req, res, authOptions);
  console.log('req.body', typeof email.email);
  const user = await prisma.user.findUnique({
    where: {
      email: email.email,
    },
  });

  if (req.method === 'POST') {
    const profileExists = await prisma.profile.findUnique({
      where: {
        userId: user.id,
      },
    });
    const profile = await prisma.profile.create({
      data: {
        bio: bio.bio,
        userId: user?.id,
      },
    });

    res.status(201).json({ profile });
    res.status(200).json({ name: 'John Doe' });
  }
}
