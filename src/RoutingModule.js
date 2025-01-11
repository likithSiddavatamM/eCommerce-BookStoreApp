import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import DashBoard from "./Components/DashBoard/DashBoard";
import BookContainer from "./Components/BookContainer/BookContainer";

import UserProfile from "./Components/UserProfile/UserProfile";
import BookDetails from "./Components/BookDetails/BookDetails";

import Address from "./Components/Address/Address";
import OrderHistory from "./Components/OrderHistory/OrderHistory";
import Cart from "./Components/Cart/Cart";

import Wishlist from "./Components/Wishlist/Wishlist";
import OrderSuccess from "./Components/OrderSuccess/OrderSuccess";
import { ProtectedRoute } from "./Routing/ProtectedRoute";
import { AuthRoute } from "./Routing/AuthRoute";
import PageNotFound from "./Components/PageNotFound/PageNotFound";

function Routing(){
    const route = createBrowserRouter([

        {
            path: '',
            element:<>
                        <DashBoard/>
                    </>,
            children:[{
                    path: `/`,
                    element: <BookContainer/>,
                },
                {
                    path: '/book/:id',
                    element: <BookDetails />
                },
                {
                    path:'/userprofile',
                    element: <UserProfile/>
                },

                { 
                    path:'/address',
                    element: <Address/>
                },
                { 
                    path:'/notfound',
                    element: <AuthRoute><PageNotFound/></AuthRoute>
                },
                {
                    path:'/orders',
                    element: <OrderHistory/>
                },
                 {
                  path: '/cart', 
                  element: <Cart/>,
                },
                  {
                  path: '/wishlist',
                  element: <Wishlist/>  
                },
                {
                    path: '/ordersuccess',
                    element: <OrderSuccess/>
                }

            ]
        }
    ])

    return  <RouterProvider router={route}/>
}

export default Routing;