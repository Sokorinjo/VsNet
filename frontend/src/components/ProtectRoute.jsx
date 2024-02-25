import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import LoginPage  from "../views/LoginPage.jsx";

const ProtectRoute = () => {
  const token = useSelector((state) => state.auth.token);
  console.log(`Protected Route token: ${token}`);

  // const navigate = useNavigate();
  // if(token){
  //   return <Outlet />
  // }else{
  //   navigate('/login')
  //   return <LoginPage />
  // }

  return <>{token ? <Outlet /> : <Navigate to='/login' />}</>;
};

export default ProtectRoute;
