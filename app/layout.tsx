import '@/src/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'

import App from '_app'
import NavBar from '@/src/sections/NavBar'

export const metadata = {
  title: 'DukSooGoong Portal',
  description: 'Portal to manage schools',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <App>
          <NavBar />
          <main>{children}</main>
        </App>
      </body>
    </html>
  )
}
