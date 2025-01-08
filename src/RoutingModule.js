import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DashBoard from "./Components/DashBoard/DashBoard";
import BookContainer from "./Components/BookContainer/BookContainer";

import UserProfile from "./Components/UserProfile/UserProfile";
import BookDetails from "./Components/BookDetails/BookDetails";

import Address from "./Components/Address/Address";
import Admin from "./Components/Admin/Admin";
import OrderHistory from "./Components/OrderHistory/OrderHistory";
import Cart from "./Components/Cart/Cart";

import Wishlist from "./Components/Wishlist/Wishlist";


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
                    path:'/admin',
                    element: <Admin/>
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
                }

            ]
        }
    ])

    return  <RouterProvider router={route}/>
}

export default Routing;