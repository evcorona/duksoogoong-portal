import { Avatar, Card, Stack, Typography } from '@mui/material'

export interface TitleCardProps {
  title: string
  subtitle: string
  extraData: string[]
}

export default function TitleCard(props: TitleCardProps) {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 4,
        height: '100%',
        gap: '24px',
        justifyContent: 'center',
      }}
    >
      <Avatar
        sx={{
          width: 140,
          height: 140,
          fontSize: '3rem',
          backgroundColor: '#EEEEEE',
          textTransform: 'capitalize',
        }}
      >
        {props.title[0]}
      </Avatar>
      <Stack marginTop={2} gap={1} direction='column' alignItems='center'>
        <Typography variant='h4' textAlign='center' textTransform='capitalize'>
          {props.title}
        </Typography>
        <Typography color='text.secondary' textTransform='capitalize'>
          {props.subtitle}
        </Typography>
      </Stack>
      <Stack
        marginTop={2}
        gap={1}
        maxWidth={300}
        alignItems='center'
        justifyContent='center'
      >
        {props.extraData.map((data, index) => (
          <Typography key={index} textAlign='center' textTransform='capitalize'>
            {data}
          </Typography>
        ))}
      </Stack>
    </Card>
  )
}
