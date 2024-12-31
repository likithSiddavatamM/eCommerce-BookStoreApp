import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DashBoard from "./Components/DashBoard/DashBoard";
import BookContainer from "./Components/BookContainer/BookContainer";
import Header from "./Components/Header/Header";
import UserProfile from "./Components/UserProfile/UserProfile";

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
                    path:'/userprofile',
                    element: <UserProfile/>
                }
            ]
        }
    ])

    return  <RouterProvider router={route}/>
}

export default Routing;