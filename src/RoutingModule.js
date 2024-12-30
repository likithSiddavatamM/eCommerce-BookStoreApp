import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DashBoard from "./Components/DashBoard/DashBoard";
import OrderHistory from "./Components/OrderHistory/OrderHistory";

function Routing(){
    const route = createBrowserRouter([
        {
            path: '',
            element: <DashBoard/> ,
            children: [
                {
                  path: "orders",
                  element: <OrderHistory />,
                },]
        }
        
    ])

    return  <RouterProvider router={route}/>
}

export default Routing;