import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DashBoard from "./Components/DashBoard/DashBoard";
import BookContainer from "./Components/BookContainer/BookContainer";
import Header from "./Components/Header/Header";
import UserProfile from "./Components/UserProfile/UserProfile";
import BookDetails from "./Components/BookDetails/BookDetails";

import Address from "./Components/Address/Address";
import Admin from "./Components/Admin/Admin";
import OrderHistory from "./Components/OrderHistory/OrderHistory";
import Cart from "./Components/Cart/Cart";
import Footer from "./Components/Footer/Footer";
import Path_Sort from "./Components/Path_Sort/Path_Sort";
import Wishlist from "./Components/Wishlist/Wishlist";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";


function Routing(){
    const route = createBrowserRouter([

        {
            path: '',
            element:<>
                        <Header/>
                        <Path_Sort/>
                        <DashBoard/>
                        <Footer/>

                    </>,
            children:[{
                    path: '/',
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
                },
                

            ]
        },
        {
            path: '/forgotpassword', 
            element: <ForgotPassword />,
        },
        {
            path: '/resetpassword',
            element: <ResetPassword />  
        }
        
    ])

    return  <RouterProvider router={route}/>
}

export default Routing;