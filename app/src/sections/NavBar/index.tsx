'use client'

import { MouseEvent, useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'

import MenuItem from '@mui/material/MenuItem'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { IPayload, clearUserState } from '@/src/store/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { ArrowBackIos, Home, Logout, Person } from '@mui/icons-material'
import { Divider, Stack } from '@mui/material'

interface ISetting {
  icon: any
  label: string
  onClick: () => void
}

export default function NavBar() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const authData = useSelector((state: { user: IPayload }) => state?.user)

  const { push, back } = useRouter()
  const dispatch = useDispatch()

  const settings: ISetting[] = [
    {
      icon: Logout,
      label: 'Cerrar sesión',
      onClick: () => {
        dispatch(clearUserState())
        push('/login')
      },
    },
  ]

  const pathname = usePathname()

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) =>
    setAnchorElUser(event.currentTarget)
  const handleCloseUserMenu = () => setAnchorElUser(null)

  if (pathname === '/login') return <></>

  const isLogged = authData?.role

  return (
    <AppBar
      position="static"
      color="transparent"
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'flex' },
              flexGrow: 1,
              gap: 2,
            }}
          >
            <Image
              src={'/logo.png'}
              alt={'Logo'}
              width={50}
              height={50}
            />
            <Stack
              direction="row"
              gap={2}
              justifyContent={'space-between'}
              flexGrow={1}
            >
              <Button
                onClick={() => back()}
                startIcon={<ArrowBackIos />}
              >
                Regresar
              </Button>
              {pathname === '/login' && (
                <Button
                  onClick={() => push('/')}
                  startIcon={<Home />}
                >
                  Inicio
                </Button>
              )}
            </Stack>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {isLogged && (
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0 }}
              >
                <Avatar>
                  <Person />
                </Avatar>
              </IconButton>
            )}
            {!isLogged && (
              <Button
                onClick={() => push('/login')}
                sx={{ color: 'white', display: 'block' }}
              >
                Iniciar sesión
              </Button>
            )}
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Typography
                sx={{
                  textAlign: 'center',
                  fontSize: 'small',
                  paddingBottom: 1,
                  cursor: 'default',
                }}
              >
                Portal
              </Typography>
              <Divider />
              {settings.map((setting, i) => (
                <MenuItem
                  key={i}
                  onClick={() => {
                    setting?.onClick()
                    handleCloseUserMenu()
                  }}
                >
                  <setting.icon sx={{ color: 'white', marginRight: 1 }} />
                  <Typography sx={{ textAlign: 'center', fontSize: 'small' }}>
                    {setting?.label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
