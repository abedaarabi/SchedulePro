import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const shifts = await prisma.shift.findMany();
    res.status(200).json(shifts);
  } else if (req.method === 'POST') {
    const { title, start, end, color } = req.body;
    const newShift = await prisma.shift.create({
      data: {
        title,
        start: new Date(start),
        end: new Date(end),
        color,
        approved: false,
      },
    });
    res.status(201).json(newShift);
  } else if (req.method === 'PUT') {
    const { id, title, start, end, color } = req.body;
    const updatedShift = await prisma.shift.update({
      where: { id },
      data: {
        title,
        start: new Date(start),
        end: new Date(end),
        color,
      },
    });
    res.status(200).json(updatedShift);
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 