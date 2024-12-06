import { useSelector } from 'react-redux'
import { IPayload } from '@/src/store/userSlice'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Auth({ children }: { children: React.ReactNode }) {
  const authData = useSelector((state: { user: IPayload }) => state?.user)

  const token = sessionStorage.getItem('DSG')

  const { push } = useRouter()
  const pathname = usePathname()

  const isRegisterPath = pathname.includes('registro')

  useEffect(() => {
    if (!authData?.role && !isRegisterPath) push('/login')
  }, [authData])

  useEffect(() => {
    if (!token && !isRegisterPath) push('/login')
  }, [token])

  return <>{children}</>
}
