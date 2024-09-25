import { TaskId } from '@/schema/task'
import { Task } from '@prisma/client'
import { cookies, headers } from 'next/headers'
import { notFound } from 'next/navigation'

type Props = {
  params: TaskId
}

async function fetchSingleTask(data: { token: string | undefined } & TaskId) {
  const res = await fetch(
    `${
      process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}/api/tasks/${data.taskId}`
        : `${process.env.NEXTAUTH_URL}/api/tasks/${data.taskId}`
    }`,
    {
      headers: {
        cookie: `next-auth.session-token=${data.token}`,
      },
    }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch data in server')
  }

  const task: Task = await res.json()
  return task
}

export default async function TaskDetailPage({ params }: Props) {
  const nextCookies = cookies()
  const token = nextCookies.get('next-auth.session-token')
  const task = await fetchSingleTask({
    token: token?.value,
    taskId: params.taskId,
  })
  if (!task) return notFound()
    
  return <div className="mt-16 p-8"></div>
}
