import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    user: any;
    bio: string;
    id: string;
    email: string;
    userName: string;
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  const { bio, email, userName } = req.body;

  if (req.method === 'POST') {
    const user = await prisma.user.update({
      data: {
        bio: bio,
        userName: userName,
      },
      where: {
        email: email,
      },
    });

    res.status(201).json({ user });
    res.status(200).json({ name: 'John Doe' });
  }
}
