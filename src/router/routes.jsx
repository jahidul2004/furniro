import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import Shop from "../pages/shop/Shop";
import ProductDetails from "../pages/productDetails/ProductDetails";
import Cart from "../pages/cart/Cart";
import Checkout from "../pages/checkout/Checkout";
import Contact from "../pages/contact/Contact";
import About from "../pages/about/About";
import Blog from "../pages/blog/Blog";
import BlogDetails from "../components/blog/BlogDetails";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import Dashboard from "../pages/admin/Dashboard";
import AdminHome from "../pages/admin/home/AdminHome";
import AllOrders from "../pages/admin/allOrders/AllOrders";
import AddProduct from "../pages/admin/addProduct/AddProduct";
import MyAccount from "../pages/myAccount/MyAccount";
import LoginRegisterPrivate from "./LoginRegisterPrivate";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/shop",
                element: <Shop></Shop>,
            },
            {
                path: "/shop/:id",
                element: <ProductDetails></ProductDetails>,
            },
            {
                path: "/cart",
                element: <Cart></Cart>,
            },
            {
                path: "/checkout",
                element: <Checkout></Checkout>,
            },
            {
                path: "/contact",
                element: <Contact></Contact>,
            },
            {
                path: "/about",
                element: <About></About>,
            },
            {
                path: "/blog",
                element: <Blog></Blog>,
            },
            {
                path: "/blog/:id",
                element: <BlogDetails></BlogDetails>,
            },
            {
                path: "/register",
                element: (
                    <LoginRegisterPrivate>
                        <Register></Register>
                    </LoginRegisterPrivate>
                ),
            },
            {
                path: "/login",
                element: (
                    <LoginRegisterPrivate>
                        <Login></Login>
                    </LoginRegisterPrivate>
                ),
            },
            {
                path: "/myAccount",
                element: <MyAccount></MyAccount>,
            },
        ],
    },
    {
        path: "/admin/dashboard",
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: "/admin/dashboard",
                element: <AdminHome></AdminHome>,
            },
            {
                path: "allOrders",
                element: <AllOrders></AllOrders>,
            },
            {
                path: "addProduct",
                element: <AddProduct></AddProduct>,
            },
        ],
    },
]);

export default router;
