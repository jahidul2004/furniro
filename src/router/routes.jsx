import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import Shop from "../pages/shop/Shop";
import ProductDetails from "../pages/productDetails/ProductDetails";
import Cart from "../pages/cart/Cart";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children:[
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path:"/shop",
                element: <Shop></Shop>
            },
            {
                path:"/shop/:id",
                element: <ProductDetails></ProductDetails>
            },
            {
                path:"/cart",
                element: <Cart></Cart>
            }
        ]
    },
]);

export default router;
