import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Homepage from "../pages/Homepage";
import AuthenticationPage from "../pages/Authentication";
import Login from "../components/Login";
import Registration from "../components/Registration";

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

            }
            
        ]
    }
]);

export default router;