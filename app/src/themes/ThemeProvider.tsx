'use client'

import { ReactNode } from 'react'

import {
  ThemeProvider as MUIThemeProvider,
  ThemeOptions,
  createTheme,
} from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { Noto_Sans } from 'next/font/google'

const comicNeue = Noto_Sans({
  weight: ['300', '400'],
  subsets: ['latin'],
})

type Props = {
  children: ReactNode
}

export default function ThemeProvider({ children }: Props) {
  const black = '#1e1e1e'
  const white = '#fdf9f9'
  const brown = '#786F52'
  // const red = "#ED6A5A";
  const yellow = '#E1BC29'

  const theme: ThemeOptions = createTheme({
    palette: {
      background: {
        default: black,
        paper: black,
      },
      primary: {
        main: yellow,
      },
      secondary: {
        main: brown,
      },
    },
    typography: {
      fontFamily: `${comicNeue.style.fontFamily}, Arial, sans-serif`,
    },
    components: {
      MuiDialogContent: {
        styleOverrides: {
          root: {
            backgroundColor: white,
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            backgroundColor: brown,
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            color: white,
            '&.MuiTypography-subtitle1': {
              color: black,
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: white,
            color: black,
            '& .MuiTypography-root': {
              color: black,
            },
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            color: yellow,
            textDecoration: 'none',
            fontWeight: 'bold',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            fontWeight: 'bold',
            boxShadow: 'none',
            variants: [
              {
                props: { variant: 'contained', color: 'primary' },
                style: {
                  backgroundColor: yellow,
                },
              },
            ],
          },
        },
      },
    },
  })

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  )
}
