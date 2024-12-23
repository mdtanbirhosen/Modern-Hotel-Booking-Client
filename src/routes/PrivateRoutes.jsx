import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

import PropTypes from "prop-types";

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        console.log("loading")
        return <div> Loading</div>
    }
    if (user && user?.email) {
        return children;
    }
    return <Navigate state={location.pathname} to="/authenticationPage" />;
};

PrivateRoutes.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PrivateRoutes;
