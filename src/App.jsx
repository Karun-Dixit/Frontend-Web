import { lazy, Suspense, useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Lazy Imports
const Login = lazy(() => import("./components/public/Login"));
const Register = lazy(() => import("./components/public/Register"));
const Dashboard = lazy(() => import("./components/private/dashboard/Dashboard"));
const Layout = lazy(() => import("./components/private/Layout"));
const ViewProduct = lazy(() => import("./components/private/Products/ViewProduct"));
const AddProduct = lazy(() => import("./components/private/Products/AddProduct"));
const PublicDashboard = lazy(() => import("./components/public/PublicDashboard"));
const EditProduct = lazy(() => import("./components/private/Products/EditProduct"));
const Users = lazy(() => import("./components/private/Users/Users"));
const PublicNavbar = lazy(() => import("./components/common/customer/PublicNavbar"));

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if the user is an admin on component mount
  useEffect(() => {
    const adminStatus = localStorage.getItem("isAdmin");
    setIsAdmin(adminStatus === "true"); // Convert string to boolean
  }, []);

  const publicRoutes = [
    { path: "/login", element: <Suspense fallback={<div>Loading...</div>}><Login /></Suspense>, errorElement: <div>Error</div> },
    { path: "/", element: <Suspense fallback={<div>Loading...</div>}><Register /></Suspense>, errorElement: <div>Error</div> },
    { path: "/register", element: <Suspense fallback={<div>Loading...</div>}><Register /></Suspense>, errorElement: <div>Error</div> },
    { path: "/dashboard", element: <Suspense fallback={<div>Loading...</div>}><PublicDashboard /></Suspense>, errorElement: <div>Error</div> },
    { path: "/PublicNavbar", element: <Suspense fallback={<div>Loading...</div>}><PublicNavbar /></Suspense>, errorElement: <div>Error</div> },
    { path: "*", element: <div>404: Page not found</div> },
  ];

  const privateRoutes = [
    {
      path: "/admin",
      element: <Suspense fallback={<div>Loading...</div>}><Layout /></Suspense>,
      // errorElement: <>Error</>,
      children: [
        { path: "dashboard", element: <Suspense fallback={<div>Loading...</div>}><Dashboard /></Suspense>, errorElement: <>Error</> },
        { path: "products/view-products", element: <Suspense fallback={<div>Loading...</div>}><ViewProduct /></Suspense>, errorElement: <>Error</> },
        { path: "products/add-products", element: <Suspense fallback={<div>Loading...</div>}><AddProduct /></Suspense>, errorElement: <>Error</> },
        { path: "users", element: <Suspense fallback={<div>Loading...</div>}><Users /></Suspense>, errorElement: <>Error</> },
        { path: "products/edit-products/:productId", element: <Suspense fallback={<div>Loading...</div>}><EditProduct /></Suspense>, errorElement: <>Error</> },
      ],
    },
  ];

  // Choose routes based on isAdmin status
  const routes = isAdmin ? privateRoutes : publicRoutes;

  // ✅ Move router creation outside JSX return
  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
}

export default App;
