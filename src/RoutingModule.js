import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DashBoard from "./Components/DashBoard/DashBoard";
import BookContainer from "./Components/BookContainer/BookContainer";
import Header from "./Components/Header/Header";
import BookDetails from "./Components/BookDetails/BookDetails";

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
                element: <BookContainer/>
            },
            {
                path: '/book/:id',
                element: <BookDetails />
            }]
        }
        
    ])

    return  <RouterProvider router={route}/>
}

export default Routing;