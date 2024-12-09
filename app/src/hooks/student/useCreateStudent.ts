import MESSAGES from '@/src/constants/messages'
import { createStudents } from '@/src/services/students'
import { IStudent } from '@/src/types/Student'
import { useMutation } from '@tanstack/react-query'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

export default function useCreateStudent() {
  const { tutorId } = useParams<{ tutorId: string }>()

  const { push, back } = useRouter()
  const pathname = usePathname()

  const {
    mutate: createStudentMutation,
    isPending: isCreating,
    isSuccess: isCreated,
  } = useMutation({
    mutationFn: createStudents,
    onSuccess: () => {
      toast.success(MESSAGES.create.success.student, {
        onClose: () => {
          pathname.includes('registro')
            ? push(`${pathname.replace('student', '')}`)
            : back()
        },
      })
    },
    onError: () => toast.error(MESSAGES.create.error.student),
  })

  const createStudentSubmit = (formValues: IStudent) =>
    createStudentMutation({ ...formValues, tutorId })

  return { createStudentSubmit, isCreating, isCreated }
}
