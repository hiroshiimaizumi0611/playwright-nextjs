'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function MonitorSession() {
  const router = useRouter()

  const { data: session } = useSession()
  useEffect(() => {
    router.refresh()
  }, [session])

  return null
}
