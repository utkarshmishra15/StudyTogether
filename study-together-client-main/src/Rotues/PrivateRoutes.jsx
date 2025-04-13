import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import PropTypes from "prop-types";
import Lottie from "lottie-react";
import Loading from "../img/loading.json";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading)
    return (
      <div className="flex justify-center my-20">
        <Lottie className="w-32 " animationData={Loading} loop={true} />
      </div>
    );

  if (user) return children;

  return <Navigate to="/login" state={location.pathname}></Navigate>;
};

export default PrivateRoutes;
PrivateRoutes.propTypes = {
  children: PropTypes.node,
};
