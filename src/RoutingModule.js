import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DashBoard from "./Components/DashBoard/DashBoard";
import BookContainer from "./Components/BookContainer/BookContainer";
import Header from "./Components/Header/Header";
import UserProfile from "./Components/UserProfile/UserProfile";
import BookDetails from "./Components/BookDetails/BookDetails";
import Wishlist from "./Components/Wishlist/Wishlist";


function Routing(){
    const route = createBrowserRouter([

        {
            path: '',
            element:<>
                        <Header/>
                        <DashBoard/>
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
                  path: '/wishlist',
                  element: <Wishlist/>  
                }
            ]
        }
    ])

    return  <RouterProvider router={route}/>
}

export default Routing;