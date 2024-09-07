import "./styles/globals.css";

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
        <main>{children}</main>
      </body>
    </html>
  );
}
