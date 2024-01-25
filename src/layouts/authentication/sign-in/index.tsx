/**
=========================================================
* Material Dashboard 2 PRO React TS - v1.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { ChangeEvent, useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import apiUrlV1 from "utils/axiosInstance";
import { useDispatch } from "react-redux";
import { setCredentials } from "redux/features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

// React-toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Grid } from "@mui/material";

function Basic(): JSX.Element {
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [isLoginProcessing, setIsLoginProcessing] = useState<boolean>(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const [getPhonenumber, setPhonenumber] = useState<string>("");
  const [getPassword, setPassword] = useState<string>("");
  const handlePhonenumber = (e: ChangeEvent<HTMLInputElement>) => setPhonenumber(e.target.value);
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (e: any) => {
    e.preventDefault();

    // Set isLoginProcess
    setIsLoginProcessing(true);
    apiUrlV1
      .post("/auth/login", {
        phoneNumber: getPhonenumber,
        password: getPassword,
      })
      .then((response) => {
        setIsLoginProcessing(false);
        const data = response.data.data;

        if (data.user.userType.id == 2) {
          dispatch(setCredentials(data));
          localStorage.setItem("accessToken", data.tokens.accessToken);
          localStorage.setItem("refreshToken", data.tokens.refreshToken);
          navigate("/admin");
        } else {
          toast.error("You don't have driver access", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      })
      .catch((error) => {
        setIsLoginProcessing(false);
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  };

  const linkStyle = {
    fontSize: "14px",
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={login}>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Phone number"
                name="phonenumber"
                fullWidth
                value={getPhonenumber}
                onChange={handlePhonenumber}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                name="password"
                fullWidth
                value={getPassword}
                onChange={handlePassword}
              />
            </MDBox>
            <Grid container spacing={3}>
              <Grid item xs={5} lg={5}>
                <MDBox display="flex" alignItems="center">
                  <Switch checked={rememberMe} onChange={handleSetRememberMe} />
                  <MDTypography
                    variant="button"
                    fontWeight="regular"
                    color="text"
                    onClick={handleSetRememberMe}
                    sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                  >
                    &nbsp;&nbsp;Remember me
                  </MDTypography>
                </MDBox>
              </Grid>
              <Grid item xs={5} lg={5}>
                <MDBox sx={{ float: "right" }}>
                  <Link to="/reset-password" style={linkStyle}>
                    Reset password
                  </Link>
                </MDBox>
              </Grid>
            </Grid>

            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                type="submit"
                color="info"
                disabled={isLoginProcessing}
                fullWidth
              >
                sign in
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BasicLayout>
  );
}

export default Basic;
