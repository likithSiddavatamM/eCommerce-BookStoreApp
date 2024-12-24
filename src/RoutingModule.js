import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DashBoard from "./Components/DashBoard/DashBoard";

function Routing(){
    const route = createBrowserRouter([
        {
            path: '',
            element: <DashBoard/> ,
        }
        
    ])

    return  <RouterProvider router={route}/>
}

export default Routing;