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
                path:"/register",
                element: <Register></Register>
            }
        ],
    },
]);

export default router;
