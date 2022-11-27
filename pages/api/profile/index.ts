import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    bio: {
      image: never;
      // image: string;
      userName: string;
      bio: string;
    };
    email: string;
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  const { bio, email } = req.body;

  if (req.method === 'POST') {
    const profile = await prisma.profile.create({
      data: {
        bio: bio.bio,
        User: {
          connect: {
            email: email,
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
