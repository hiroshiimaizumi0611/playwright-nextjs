import useStore from '@/store'
import { Task } from '@prisma/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function TaskItem(task: Task) {
  const router = useRouter()
  const updatedEditedTask = useStore((state) => state.updateEditedTask)
  const resetEditedTask = useStore((state) => state.resetEditedTask)

  async function updateTaskHandler(data: { id: string; completed: boolean }) {
    await fetch(`/api/tasks/&{datya.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: data.completed }),
    })
    router.refresh()
    resetEditedTask()
  }

  async function deleteTaskHandler(id: string) {
    await fetch(`/api/tasks${task.id}`, {
      method: 'DELETE',
    })
    router.refresh()
  }

  return (
    <li className="my-2">
      <input
        type="checkbox"
        className="mr-1"
        checked={task.completed}
        onChange={() =>
          updateTaskHandler({ id: task.id, completed: !task.completed })
        }
      />
      <Link href={`task-crud/${task.id}`}>{task.title}</Link>
    </li>
  )
}
