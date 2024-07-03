import './App.css';
import Header from './Components/Home/header';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import HomePage from './Components/Home/homepage';
import About from './Components/Home/about';
import Login from './Components/Home/Auth/login';
import Footer from './Components/Home/footer';
import Store from './Components/Store/store';
import Signin from './Components/Home/Auth/signin';
import Product_View from './Components/Store/product';
import Logout from './Components/Home/Auth/logout';
import Profile from './Components/Profile/buyerProfile';
import Credit from './Components/Profile/profilePages/user/credit';
import Purchase from './Components/Profile/profilePages/user/purchase';
import TrackOrder from './Components/Profile/profilePages/user/order';
import ForgotPassword from './Components/Profile/profilePages/user/forgot-password';
import Cart from './Components/Orders/Cart';
import WishList from './Components/Orders/wishlist';
import BecomeSeller from './Components/Home/Auth/seller-register';
import SellerLogin from './Components/Home/Auth/seller-login';
import SellerProfile from './Components/Profile/sellerProfile';
import AddNewItem from './Components/Profile/profilePages/seller/addNew';
import Selling from './Components/Profile/profilePages/seller/selling';
import ViewAll from './Components/Profile/profilePages/seller/viewall';
import TotalEarnings from './Components/Profile/profilePages/seller/totalEarnings';

function App() {
  const router = createBrowserRouter([
    {path: "/", element: <><Header /><HomePage /></>},
    {path: "/about",element: <><Header /><About /></>},
    {path: "/login", element: <><Header /><Login /></>},
    {path: "/signin", element: <><Header /><Signin /></>},
    {path: "/store", element: <><Header /><Store /></> },
    {path: "/product/:id", element: <><Header /><Product_View /></>},
    {path: "/logout", element: <><Header /><Logout /></>},
    {path: '/user-profile', element: <><Header /><Profile /></>},
    {path: '/credit-points', element: <><Header /><Credit /></>},
    {path: '/purchase-history', element: <><Header /><Purchase /></>},
    {path: '/track-order', element: <><Header /><TrackOrder /></>},
    {path: '/forgot-password', element: <><Header /><ForgotPassword /></>},
    {path: '/cart', element: <><Header/><Cart/></>},
    {path: '/wishlist', element: <><Header/><WishList/></>},
    {path: '/become-seller', element: <><Header/><BecomeSeller/></>},
    {path: '/seller-login', element: <><Header/><SellerLogin/></>},
    {path: '/seller-profile', element: <><Header/><SellerProfile/></>},
    {path: '/add-new-item', element: <><Header/><AddNewItem/></>},
    {path: '/selling-products', element: <><Header/><Selling/></>},
    {path: '/view-all', element: <><Header/><ViewAll/></>},
    {path: '/total-earnings', element: <><Header/><TotalEarnings/></>},
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
      <Footer />
    </div>
  );
}

export default App;
