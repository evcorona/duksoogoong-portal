"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { Bounce, ToastContainer } from "react-toastify";
import { AuthProvider } from "@/src/contexts/auth";
import ThemeProvider from "@/src/themes/ThemeProvider";

const queryClient = new QueryClient();

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AuthProvider>
          <ThemeProvider>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              transition={Bounce}
            />
            <main>{children}</main>
            <ToastContainer />
          </ThemeProvider>
        </AuthProvider>
      </LocalizationProvider>
    </QueryClientProvider>
  );
}
