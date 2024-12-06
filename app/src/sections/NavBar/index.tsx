"use client";

import { useState, MouseEvent } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import MenuItem from "@mui/material/MenuItem";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { clearUserState, IPayload } from "@/src/store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Logout, Person } from "@mui/icons-material";
import { Divider } from "@mui/material";

interface ISetting {
  icon: any;
  label: string;
  onClick: () => void;
}

export default function NavBar() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const authData = useSelector((state: { user: IPayload }) => state?.user);

  const { push } = useRouter();
  const dispatch = useDispatch();

  const settings: ISetting[] = [
    {
      icon: Logout,
      label: "Cerrar sesión",
      onClick: () => {
        dispatch(clearUserState());
        push("/login");
      },
    },
  ];

  const pathname = usePathname();

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) =>
    setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) =>
    setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  if (pathname === "/login") return <></>;

  const isLogged = authData?.role;

  return (
    <AppBar position="static" color="transparent">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              mr: 2,
              display: { xs: "flex", md: "flex" },
              flexGrow: 1,
            }}
          >
            <Image src={"/logo.png"} alt={"Logo"} width={50} height={50} />
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {isLogged && (
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar>
                  <Person />
                </Avatar>
              </IconButton>
            )}
            {!isLogged && (
              <Button
                onClick={() => push("/login")}
                sx={{ color: "white", display: "block" }}
              >
                Iniciar sesión
              </Button>
            )}
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: "small",
                  paddingBottom: 1,
                  cursor: "default",
                }}
              >
                Portal
              </Typography>
              <Divider />
              {settings.map((setting, i) => (
                <MenuItem
                  key={i}
                  onClick={() => {
                    setting?.onClick();
                    handleCloseUserMenu();
                  }}
                >
                  <setting.icon sx={{ color: "white", marginRight: 1 }} />
                  <Typography sx={{ textAlign: "center", fontSize: "small" }}>
                    {setting?.label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
