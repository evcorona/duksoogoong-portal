import "./src/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import App from "./_app";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["300", "600"],
  subsets: ["latin"],
});

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
      <body className={poppins.className}>
        <App>{children}</App>
      </body>
    </html>
  );
}
