import {
  Card,
  Chip,
  List,
  ListItem,
  ListItemText,
  Stack,
  SxProps,
  Typography,
} from '@mui/material'
import { ITableData } from '@/src/types/table/TableData'
import { useTranslation } from 'next-i18next'
import { Fragment } from 'react'
import TitleBar from 'src/components/TitleBar'
import SkeletonCard from 'src/components/CustomCard/SkeletonCard'
import { isArray } from 'lodash'
import { useRouter } from 'next/navigation'

type Props = {
  title: string
  data: any[]
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

export default function CustomCard(props: Props) {
  const { t } = useTranslation()

  const { push } = useRouter()

  if (props.isLoading || !props.data.length)
    return (
      <SkeletonCard
        title={props.title}
        headers={props.headers}
        isLoading={props.isLoading}
        columnHeight={props.columnHeight}
        sx={props.sx}
      />
    )

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
          {props.data.map((item, i) => (
            <Fragment key={`list-${i}`}>
              {props.headers.map((header: ITableData, j) => {
                const value = item[header.accessor]
                const customRow =
                  header.customRow && header.customRow(value, item)
                const content = customRow?.value ?? value
                const contentIsArray = isArray(content)

                const translationOptions = customRow?.translationOptions
                const contentLocalized = header.translate
                  ? t(content, translationOptions)
                  : content

                const redirectPath = () => push(customRow?.redirectTo ?? '')
                const onClick = customRow?.redirectTo
                  ? redirectPath
                  : customRow?.onClick

                const isCursorPointer =
                  customRow?.redirectTo || customRow?.onClick

                return (
                  <ListItem
                    key={`listItem-${j}`}
                    disablePadding
                    onClick={onClick}
                    sx={{
                      marginBottom: 0.5,
                      width: 'fit-content',
                      cursor: isCursorPointer ? 'pointer' : 'default',
                      ':hover': {
                        textDecoration: isCursorPointer ? 'underline' : 'none',
                        textUnderlineOffset: '4px',
                      },
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
                    {contentIsArray &&
                      content.map((item, index) => (
                        <Chip
                          key={index}
                          label={item}
                          size='small'
                          sx={{ marginRight: 1 }}
                        />
                      ))}
                    {!contentIsArray && (
                      <Typography fontSize='small' sx={customRow?.styles}>
                        {contentLocalized}
                      </Typography>
                    )}
                  </ListItem>
                )
              })}
            </Fragment>
          ))}
        </Stack>
      </List>
    </Card>
  )
}
