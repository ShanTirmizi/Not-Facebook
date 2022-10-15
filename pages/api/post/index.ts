// write a prisma fucntion to create a post

// import prisma from 'lib/prisma';
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  // console.log(session);

  if (req.method === 'POST') {
    console.log(req.body);
    const { bio } = req.body;

    const profile = await prisma.profile.create({
      data: {
        bio: bio,
        // User: {
        //   connect: {
        //     id: 'cl91la6n8000048k0l20kp7fs',
        //   },
        // },
      },
    });

    res.status(201).json({ profile });
  }

  res.status(200).json({ name: 'John Doe' });
}
