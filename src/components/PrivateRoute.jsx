import Dashboard from "../pages/Dashboard";
import { useNavigate } from "react-router-dom";

const PrivateRoute = () => {
  let navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token") ? true : false;

  return (
    isLoggedIn ? <Dashboard /> : navigate("/")
  );
};

export default PrivateRoute;
