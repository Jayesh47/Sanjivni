import './App.css';
import Header from './Components/Home/header';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './Components/Home/homepage';
import About from './Components/Home/about';
import Login from './Components/Home/Auth/login';
import Footer from './Components/Home/footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Store from './Components/Store/store';
import Signin from './Components/Home/Auth/signin';
import Product_View from './Components/Store/product';
import Logout from './Components/Home/Auth/logout';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <><Header /><HomePage /></>
    },
    {
      path: "/about",
      element: <><Header /><About /></>
    },
    {
      path: "/login",
      element: <><Header /><Login /></>
    },
    {
      path: "/signin",
      element: <><Header /><Signin /></>
    },
    {
      path: "/store",
      element: <><Header /><Store /></>
    },
    {
      path: "/product/:id",
      element: <><Header /><Product_View /></>
    },
    {
      path: "/logout",
      element: <><Header /><Logout /></>
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
      <Footer />
    </div>
  );
}

export default App;
