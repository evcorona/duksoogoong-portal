'use client'

import CustomTable from '@/components/CustomTable/CustomTable'
import TitleBar from '@/components/TitleBar'
import { SCHOOLS_HEADERS } from '@/schools/constants/schools.headers'
import { getSchools, deleteSchool } from '@/services/schools'
import { Add } from '@mui/icons-material'
import { Container } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter, usePathname } from 'next/navigation'
import { toast } from 'react-toastify'

export default function Schools() {
  const { push } = useRouter()
  const pathname = usePathname()

  const notify = () => toast('Wow so easy!')

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['allSchools'],
    queryFn: getSchools,
  })

  const { mutateAsync: deleteMutation } = useMutation({
    mutationFn: deleteSchool,
    onSuccess: () => refetch(),
  })

  return (
    <Container maxWidth='xl' sx={{ paddingY: { xs: 2, sm: 4 } }}>
      <TitleBar
        title='Escuelas'
        buttonProps={{
          label: 'crear escuela',
          icon: <Add />,
          onClick: () => push(`${pathname}/create`),
        }}
      />
      <CustomTable
        size='small'
        name='schools'
        headers={SCHOOLS_HEADERS}
        data={data || []}
        isLoading={isLoading}
        menuProps={{
          editAction: (data) => push(`${pathname}/${data?._id}/edit`),
          deleteAction: (data) => deleteMutation(data?._id),
        }}
        sx={{ marginTop: 2, paddingBottom: 2 }}
      />
    </Container>
  )
}
