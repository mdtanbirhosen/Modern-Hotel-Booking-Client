import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Homepage from "../pages/Homepage";
import AuthenticationPage from "../pages/Authentication";
import Login from "../components/Login";
import Registration from "../components/Registration";
import Rooms from "../pages/Rooms";
import MyBookings from "../pages/MyBookings";
import PrivateRoutes from "./PrivateRoutes";
import RoomDetailsPage from "../pages/RoomDetailsPage";

const router = createBrowserRouter([
    {
        path:"/",
        element:<App></App>,
        errorElement:<div>error page</div>,
        children:[
            {
                path:"/",
                element:<Homepage></Homepage>
            },
            {
                path:"/AuthenticationPage",
                element:<AuthenticationPage></AuthenticationPage>,
                children:[
                    {
                        path:"/AuthenticationPage",
                        element:<Login></Login>
                    },
                    {
                        path:"/AuthenticationPage/registration",
                        element:<Registration></Registration>
                    }
                ]

            },
            {
                path:'/rooms',
                element:<Rooms></Rooms>
            },
            {
                path:'/myBookings',
                element:<PrivateRoutes><MyBookings></MyBookings></PrivateRoutes>
            },
            {
                path:"/roomDetailsPage/:id",
                element:<RoomDetailsPage></RoomDetailsPage>
            }
            
        ]
    }
]);

export default router;