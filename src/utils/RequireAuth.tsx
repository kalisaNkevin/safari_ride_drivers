import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useLocation, useNavigate, Navigate, Outlet } from "react-router-dom";
import { logOut, setCredentials, setTokens } from "redux/features/auth/authSlice";
import getUserDetails from "Api/getUserDetails";
import UpdateToken from "Api/UpdateToken";
import { RootState } from "redux/store";
import axios, { AxiosError } from "axios";

const RequireAuth = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector<RootState, any>((state) => state.auth);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user) {
          const userData = await getUserDetails(accessToken);
          const refreshToken = localStorage.getItem("refreshToken");
          const tokens = {
            accessToken: accessToken,
            refreshToken: refreshToken,
          };
          dispatch(setCredentials({ user: userData, tokens, isLoggedIn: true }));
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (axiosError.response && axiosError.response.status === 401) {
            try {
              const data = await UpdateToken();
              dispatch(setTokens(data));
            } catch (error) {
              localStorage.clear();
              dispatch(logOut());
              navigate("/login");
            }
          }
        }
      }
    };

    fetchData();
  }, [user, accessToken, dispatch, navigate]);

  return accessToken ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireAuth;
