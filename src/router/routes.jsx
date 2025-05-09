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
import PrivateRoute from "./PrivateRoute";
import PendingOrders from "../pages/admin/pendingOrders/PendingOrders";
import CompletedOrders from "../pages/admin/completedOrders/CompletedOrders";
import Users from "../pages/admin/users/Users";
import SellDetails from "../pages/admin/sellDetails/SellDetails";
import AllProducts from "../pages/admin/allProducts/AllProducts";
import CanceledOrders from "../pages/admin/canceledOrders/CanceledOrders";
import AdminBlog from "../pages/admin/adminBlog/AdminBlog";
import AddBlog from "../pages/admin/addBlog/AddBlog";
import AdminRoute from "./AdminRoute";

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
                element: (
                    <PrivateRoute>
                        <MyAccount></MyAccount>
                    </PrivateRoute>
                ),
            },
        ],
    },
    {
        path: "/admin/dashboard",
        element: (
            <AdminRoute>
                <Dashboard></Dashboard>
            </AdminRoute>
        ),
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
            {
                path: "pendingOrders",
                element: <PendingOrders></PendingOrders>,
            },
            {
                path: "completedOrders",
                element: <CompletedOrders></CompletedOrders>,
            },
            {
                path: "users",
                element: <Users></Users>,
            },
            {
                path: "sellDetails",
                element: <SellDetails></SellDetails>,
            },
            {
                path: "allProducts",
                element: <AllProducts></AllProducts>,
            },
            {
                path: "canceledOrders",
                element: <CanceledOrders></CanceledOrders>,
            },
            {
                path: "blogs",
                element: <AdminBlog></AdminBlog>,
            },
            {
                path: "addBlog",
                element: <AddBlog></AddBlog>,
            },
        ],
    },
]);

export default router;
