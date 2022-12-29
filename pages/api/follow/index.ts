/* eslint-disable */
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    // user: any;
    // bio: string;
    // id: string;
    // email: string;
    // userName: string;
    follow: any;
    user: any;
    email: string;
    following: any;
    followingUser: string;
    // f;
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  const { email, followingUser } = req.body;
  console.log('email', followingUser);
  if (req.method === 'POST') {
    // add follow to the user model in the database
    const follow = await prisma.follows.create({
      // @ts-ignore
      data: {
        // @ts-ignore
        // Follows: {
        following: {
          // @ts-ignore
          connect: {
            id: followingUser,
          },
          // connect: {
          //   followerId_followingId: {
          //     followingId: followingUser,
          //     followerId: email,
          //   },
          // },
        },
        follower: {
          // @ts-ignore
          connect: {
            email: email,
          },
        },
      },
      // where: {
      //   email: email,
      // },
      // connect: {
      //   email: followingUser,
      // },
      // },
      // where: {
      //   email: email,
      // },
      // },
      // where: {
      //   email: email,
      // },
    });

    res.status(201).json({ follow });
    res.status(200).json({ name: 'John Doe' });
  }
}
