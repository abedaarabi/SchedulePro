import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const shifts = await prisma.shift.findMany();
  return NextResponse.json(shifts);
}

export async function POST(request: Request) {
  const { title, start, end, color } = await request.json();
  const newShift = await prisma.shift.create({
    data: {
      title,
      start: new Date(start),
      end: new Date(end),
      color,
      approved: false,
    },
  });
  return NextResponse.json(newShift);
}

export async function PUT(request: Request) {
  const { id, title, start, end, color } = await request.json();
  const updatedShift = await prisma.shift.update({
    where: { id },
    data: {
      title,
      start: new Date(start),
      end: new Date(end),
      color,
    },
  });
  return NextResponse.json(updatedShift);
} 