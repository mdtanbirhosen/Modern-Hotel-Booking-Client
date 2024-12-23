import { createBrowserRouter } from "react-router-dom";
import App from "../App";

const router = createBrowserRouter([
    {
        path:"/",
        element:<App></App>,
        errorElement:<div>error page</div>,
        children:[
            {
                
            }
        ]
    }
]);

export default router;