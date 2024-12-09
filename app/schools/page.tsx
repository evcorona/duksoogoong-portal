'use client'

import CustomTable from '@/src/components/CustomTable/CustomTable'
import TitleBar from '@/src/components/TitleBar'
import { SCHOOLS_HEADERS } from '@/schools/constants/schools.headers'
import { deleteSchool, getSchools } from '@/src/services/schools'
import { Add } from '@mui/icons-material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { usePathname, useRouter } from 'next/navigation'
import Page from '@/src/components/Page'
import SeeDetailButton from '@/src/components/CustomTable/SeeDetailButton'
import { ISchool } from '@/src/types/School'

export default function Schools() {
  const { push } = useRouter()
  const pathname = usePathname()

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['allSchools'],
    queryFn: getSchools,
  })

  const { mutateAsync: deleteMutation } = useMutation({
    mutationFn: deleteSchool,
    onSuccess: () => refetch(),
  })

  return (
    <Page>
      <TitleBar
        title="Escuelas"
        buttonProps={{
          label: 'agregar escuela',
          icon: <Add />,
          onClick: () => push(`${pathname}/create`),
        }}
      />
      <CustomTable
        name="schools"
        headers={SCHOOLS_HEADERS}
        data={data || []}
        isLoading={isLoading}
        menuProps={{
          editAction: (data) => push(`${pathname}/${data?._id}/edit`),
          deleteAction: (data) => deleteMutation(data?._id),
        }}
        sx={{ marginTop: 2, paddingBottom: 2 }}
        rowComponentProps={{
          actions: { href: (row: ISchool) => `${pathname}/${row?._id}` },
          component: SeeDetailButton,
        }}
      />
    </Page>
  )
}
