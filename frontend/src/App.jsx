import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";

import AppTheme from "./features/shared-theme/AppTheme";
import Signup from "./pages/Signup";
import ProtectedRoute from "./ui/ProtectedRoute";
import Account from "./pages/Account";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PageNotFound from "./ui/PageNotFound";
import CategoryPage from "./pages/CategoryPage";
import SubCategoryPage from "./pages/SubCategoryPage";
import DashboardLayout from "./pages/DashboardLayout";
import OrdersPage from "./pages/Orders";
import ProtectAdmin from "./ui/ProtectAdmin";
import Products from "./pages/Products";
import UploadProduct from "./pages/UploadProduct";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <AppTheme>
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

            <Route
              path="/dashboard"
              element={
                <ProtectAdmin>
                  <DashboardLayout />
                </ProtectAdmin>
              }
            >
              <Route index element={<CategoryPage />} />
              <Route path="category" element={<CategoryPage />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path="subcategory" element={<SubCategoryPage />} />
              <Route path="product" element={<Products />} />
              <Route path="upload-product" element={<UploadProduct />} />
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
          className="fixed max-w-xs transform -translate-x-1/2 pointer-events-auto top-20 left-1/2 sm:top-4 sm:max-w-md"
          theme="light"
        />
      </AppTheme>
    </QueryClientProvider>
  );
}

export default App;
