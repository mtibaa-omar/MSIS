import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { DarkModeProvider } from "./context/DarkModeContext";
import { ToastContainer } from "react-toastify";

import AppTheme from "./features/shared-theme/AppTheme";
import Signup from "./pages/Signup";
import ProtectedRoute from "./ui/ProtectedRoute";
import Account from "./pages/Account";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PageNotFound from "./ui/PageNotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <AppTheme>
        <DarkModeProvider>
          <BrowserRouter>
            <Routes>
              <Route
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="/" element={<Home />} />
                <Route path="/account" element={<Account />} />
                <Route path="*" element={<PageNotFound />} />
              </Route>

              <Route path="/login" element={<Login />} />

              <Route path="/signup" element={<Signup />} />
            </Routes>
          </BrowserRouter>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            className="fixed z-50 w-full max-w-xs transform -translate-x-1/2 pointer-events-auto top-20 left-1/2 sm:top-4 sm:max-w-md"
            theme="light"
          />
        </DarkModeProvider>
      </AppTheme>
    </QueryClientProvider>
  );
}

export default App;
