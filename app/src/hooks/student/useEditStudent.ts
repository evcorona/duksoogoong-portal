import MESSAGES from '@/src/constants/messages'
import { editStudent } from '@/src/services/students'
import { IStudent } from '@/src/types/Student'
import { useMutation } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

export default function useEditStudent() {
  const { push, back } = useRouter()
  const pathname = usePathname()

  const { mutate: editStudentMutation, isPending: isEditing } = useMutation({
    mutationFn: editStudent,
    onSuccess: () => {
      toast.success(MESSAGES.edit.success.student, {
        onClose: () => {
          pathname.includes('registro')
            ? push(`${pathname.replace('student', '')}`)
            : back()
        },
      })
    },
    onError: () => toast.error(MESSAGES.edit.error.student),
  })

  const editStudentSubmit = (formValues: IStudent) =>
    editStudentMutation({ ...formValues })

  return { editStudentSubmit, isCreating: isEditing }
}
