'use client'

import useStore from '@/store'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function TaskEdit() {
  const router = useRouter()
  const { editedTask } = useStore()
  const updatedEditedTask = useStore((state) => state.updateEditedTask)
  const resetEditedTask = useStore((state) => state.resetEditedTask)

  async function submitHandler(e: React.FocusEvent<HTMLFormElement>) {
    e.preventDefault()
    if (editedTask.id === '') {
      await fetch(`/api/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titles: editedTask.title, completed: false }),
      })
      router.refresh()
      resetEditedTask()
    } else {
      await fetch(`/api/tasks/${editedTask.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editedTask.title,
          completed: editedTask.completed,
        }),
      })
      router.refresh()
      resetEditedTask()
    }
  }

  return (
    <div className="m-5 text-center">
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="New task ?"
          value={editedTask.title || ''}
          onChange={(e) =>
            updatedEditedTask({ ...editedTask, title: e.target.value })
          }
        />
        <button type="submit">
          {editedTask.id === '' ? 'Create' : 'Update'}
        </button>
      </form>
    </div>
  )
}
