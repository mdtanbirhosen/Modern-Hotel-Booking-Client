import { Outlet } from "react-router-dom";

import Lottie from "lottie-react";
import animation from '../assets/singIn Animation.json'
const AuthenticationPage = () => {

    return (
        <div className="flex  flex-col md:flex-row">
           <div className=" md:w-1/2">
           <Lottie  animationData={animation}></Lottie>
           </div>
           <div className="md:w-1/2"> <Outlet></Outlet></div>
        </div>
    );
};

export default AuthenticationPage;