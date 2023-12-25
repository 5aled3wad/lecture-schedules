

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Home } from './pages/home/home'
import { Nav } from "./components/navbar/nav";
import { Login } from "./pages/auth/login";
import "./styles/global.scss";

function App() {
  const Layout = () => {
    return <>
      <Nav />
      <div className="contain">
        <div className="content-container">
          <Outlet />
        </div>
      </div>
    </>
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
      ]
    },
    {
      path: "login",
      element: <Login />
    }
  ]);

  return <div className="app">
    <RouterProvider router={router} />
  </div>
}

export default App