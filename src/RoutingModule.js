import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DashBoard from "./Components/DashBoard/DashBoard";
import BookContainer from "./Components/BookContainer/BookContainer";
import Header from "./Components/Header/Header";
import UserProfile from "./Components/UserProfile/UserProfile";
import BookDetails from "./Components/BookDetails/BookDetails";
import Cart from "./Components/Cart/Cart";
import Footer from "./Components/Footer/Footer";

function Routing(){
    const route = createBrowserRouter([

        {
            path: '',
            element:<>
                        <Header/>
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
                  path: '/cart', 
                  element: <Cart/>,
                },
            ]
        }
    ])

    return  <RouterProvider router={route}/>
}

export default Routing;