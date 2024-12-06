import {
  Card,
  List,
  ListItem,
  ListItemText,
  Skeleton,
  Stack,
  SxProps,
} from '@mui/material'
import TitleBar from 'src/components/TitleBar'
import { ITableData } from '@/src/types/table/TableData'
import { useTranslation } from 'next-i18next'

type Props = {
  title: string
  headers: ITableData[]
  isLoading: boolean
  sx?: SxProps
  columnHeight?: number
  titleButton?: {
    label: string
    onClick: () => void
    sx?: SxProps
  }
}
export default function SkeletonCard(props: Props) {
  const { t } = useTranslation()

  return (
    <Card sx={{ padding: 2, ...props.sx }}>
      <TitleBar
        isSectionTitle
        title={t(props.title)}
        buttonProps={props.titleButton}
      />
      <List disablePadding>
        <Stack
          height={{ xs: 'fit-content', md: props.columnHeight ?? 118 }}
          flexWrap={{ xs: 'nowrap', md: 'wrap' }}
        >
          {props.headers.map((header, i) => (
            <ListItem
              key={`listItem-${i}`}
              disablePadding
              sx={{
                marginBottom: 0.5,
                cursor: 'default',
                width: 'fit-content',
              }}
            >
              <ListItemText
                primary={`${t(header.label ?? '')}:`}
                primaryTypographyProps={{
                  fontWeight: 'bold',
                  fontSize: 'small',
                }}
                sx={{ flex: 'none', width: 150 }}
              />
              <Skeleton
                variant="text"
                width="120px"
              />
            </ListItem>
          ))}
        </Stack>
      </List>
    </Card>
  )
}
