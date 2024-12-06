'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { IPayload } from '@/src/store/userSlice'

export default function Home() {
  const authData = useSelector((state: { user: IPayload }) => state)

  const { push } = useRouter()

  useEffect(() => {
    const { role, userId, schoolId } = authData.user

    if (!role) push('/login')
    if (role === 'schoolAdmin') push(`/schools/${schoolId}`)
    if (role === 'teacher') push(`/schools/${schoolId}/teachers/${userId}`)
    if (role === 'tutor') push(`/tutors/${userId}`)
    if (role === 'admin') push('/schools')
    if (role === 'main') push('/schools')

    return
  }, [authData])

  return null
}
