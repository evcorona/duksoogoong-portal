'use client'

import CustomTable from '@/src/components/CustomTable/CustomTable'
import TitleBar from '@/src/components/TitleBar'
import { TUTORS_HEADERS } from '@/schools/[schoolId]/tutors/constants/tutor.headers'
import { deleteTutor, getTutorsBySchoolId } from '@/src/services/tutors'
import { Add } from '@mui/icons-material'
import Page from '@/src/components/Page'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ITutor } from '@/src/types/Tutor'

export default function Tutors() {
  const [selectedRow, setSelectedRow] = useState<ITutor | null>(null)

  const { push } = useRouter()
  const pathname = usePathname()
  const { schoolId } = useParams<{ schoolId: string }>()

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['schoolTutors', schoolId],
    queryFn: () => getTutorsBySchoolId(schoolId as string),
    enabled: !!schoolId,
  })

  const { mutateAsync: deleteMutation } = useMutation({
    mutationFn: deleteTutor,
    onSuccess: () => refetch(),
  })

  useEffect(() => {
    selectedRow && push(`${pathname}/${selectedRow?._id}`)
  }, [selectedRow])

  return (
    <Page>
      <TitleBar
        title="Tutores"
        buttonProps={{
          label: 'crear tutor',
          icon: <Add />,
          onClick: () => push(`${pathname}/create`),
        }}
      />
      <CustomTable
        size="small"
        name="tutors"
        headers={TUTORS_HEADERS}
        data={data || []}
        isLoading={isLoading}
        menuProps={{
          editAction: (data) => push(`${pathname}/${data?._id}/edit`),
          deleteAction: (data) => deleteMutation(data?._id),
        }}
        selectRowProps={{
          skipFirstSelection: true,
          selectedRow,
          setSelectedRow,
        }}
        sx={{ marginTop: 2, paddingBottom: 2 }}
      />
    </Page>
  )
}
