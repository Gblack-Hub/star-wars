// import { Navigate, Outlet, useLocation } from 'react-router-dom';
// import { useContext } from 'react';

// const PrivateRoutes = () => {
//   const location = useLocation();
//   const { authLogin } = useContext(true);
  
//   console.log("authLogin", authLogin);

//   return authLogin 
//     ? <Outlet />
//     : <Navigate to="/login" replace state={{ from: location }} />;
// }

// export default PrivateRoutes;