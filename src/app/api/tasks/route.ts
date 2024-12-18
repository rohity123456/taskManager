import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Task } from '@prisma/client';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page')) || 1;
  const pageSize = 10;
  const skip = (page - 1) * pageSize;
  const query = searchParams.get('q') || '';

  try {
    const tasks = await prisma.task.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { status: { contains: query, mode: 'insensitive' } },
          { priority: { contains: query, mode: 'insensitive' } }
        ]
      },
      skip,
      take: pageSize,
      orderBy: { updatedAt: 'desc' },
      select: {
        id: true,
        name: true,
        description: true,
        status: true,
        priority: true,
        createdAt: true,
        updatedAt: true,
        dueDate: true
      }
    });

    const count = await prisma.task.count({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { status: { contains: query, mode: 'insensitive' } },
          { priority: { contains: query, mode: 'insensitive' } }
        ]
      }
    });

    return NextResponse.json({ tasks, count });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const newTask: Task = await prisma.task.create({ data });
    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    );
  }
}
