import "@/src/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import App from "_app";
import NavBar from "NavBar";
import { Box } from "@mui/material";

export const metadata = {
  title: "DukSooGoong Portal",
  description: "Portal to manage schools",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        {/* <NavBar /> */}
        <App>{children}</App>
      </body>
    </html>
  );
}
