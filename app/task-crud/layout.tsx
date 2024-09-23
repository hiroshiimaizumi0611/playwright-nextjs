import { Suspense } from 'react'
import TaskEdit from '../components/task-edit'
import Spinner from '../components/spinner'
import TaskList from '../components/task-list'

export default async function TaskCrudLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="flex">
      <aside className={`h-[calc(100vh-64px)] w-1/4 bg-green-200`}>
        <TaskEdit />
        <Suspense fallback={<Spinner />}>
          <TaskList />
        </Suspense>
      </aside>
      <main className="flex flex-1 justify-center">{children}</main>
    </section>
  )
}
