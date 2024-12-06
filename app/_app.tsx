"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { Bounce, ToastContainer } from "react-toastify";
import ThemeProvider from "@/src/themes/ThemeProvider";
import { Provider } from "react-redux";
import store, { persistor } from "@/src/store";
import { PersistGate } from "redux-persist/integration/react";
import Auth from "@/src/sections/Auth";

const queryClient = new QueryClient();

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Auth>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
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
            </LocalizationProvider>
          </Auth>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}
