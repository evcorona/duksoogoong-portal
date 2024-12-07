import { Box, Grid2 as Grid, Typography } from '@mui/material'

export default function ExamTopics() {
  const topics = [
    '',
    'poomse',
    'paso de combate',
    '',
    '',
    'chagui daerion/pateo saltando',
    '',
    '',
    'combate',
  ]
  return (
    <>
      <Typography
        variant="subtitle1"
        fontWeight={'bold'}
        fontSize="14px"
      >
        Campos de Evaluación
      </Typography>
      <Grid
        container
        columnSpacing={{ xs: 1 }}
        rowSpacing={{ xs: 1 }}
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {topics.map((topic, index) => (
          <Grid
            key={index}
            size={{ xs: 4 }}
          >
            <Box
              key={index}
              sx={{ height: '180px', border: '1px solid lightgray' }}
            >
              <Typography
                variant="subtitle1"
                fontSize={'14px'}
                textAlign={'center'}
                textTransform={'uppercase'}
                paddingTop={2}
              >
                {topic}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  )
}
