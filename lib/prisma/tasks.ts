import { createTaskInput } from '@/schema/task'
import prisma from '.'

export async function getTasks(userId: string) {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: 'asc',
      },
    })
    return { tasks }
  } catch (error: any) {
    return { error }
  }
}

export async function createTask(task: createTaskInput, userId: string) {
  try {
    const createdTask = await prisma.task.create({
      data: {
        ...task,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    })
    return { task: createdTask }
  } catch (error: any) {
    return { error }
  }
}
