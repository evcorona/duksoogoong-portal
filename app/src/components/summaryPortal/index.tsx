import { Grid2 as Grid } from '@mui/material'
import TitleCard, { TitleCardProps } from './TitleCard'
import ItemCard from './ItemCard'

type Content = {
  title: string
  value?: number
  icon?: any
  iconAsset?: string
  onClick: () => void
  isDisabled: boolean
}

type Props = {
  titleData: TitleCardProps
  portalContent: {
    content: Content[]
    sx?: object
  }[]
}

export default function SummaryPortal(props: Props) {
  const sectionSize = 12 / (props.portalContent.length + 1)

  return (
    <Grid container spacing={4} padding={0}>
      <Grid
        size={{
          xs: 12,
          md: sectionSize,
        }}
      >
        <TitleCard {...props.titleData} />
      </Grid>
      {props.portalContent.map((column, i) => (
        <Grid
          key={i}
          size={{
            xs: 12,
            md: sectionSize,
          }}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          {column.content.map((item, j) => (
            <ItemCard key={j} sx={column?.sx} {...item} />
          ))}
        </Grid>
      ))}
    </Grid>
  )
}
