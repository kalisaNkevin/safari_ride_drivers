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
import { setCredentials } from "redux/features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

// React-toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Grid } from "@mui/material";

function Signup(): JSX.Element {
  const [isSignupProcessing, setIsSignupProcessing] = useState<boolean>(false);

  const [getPhonenumber, setPhonenumber] = useState<string>("");
  const [getPassword, setPassword] = useState<string>("");
  const [getEmail, setEmail] = useState<string>("");
  const [getCpPassword, setCpPassword] = useState<string>("");
  const [getFullname, setFullname] = useState<string>("");

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handleFullname = (e: ChangeEvent<HTMLInputElement>) => setFullname(e.target.value);
  const handleCpPassword = (e: ChangeEvent<HTMLInputElement>) => setCpPassword(e.target.value);
  const handlePhonenumber = (e: ChangeEvent<HTMLInputElement>) => setPhonenumber(e.target.value);
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const navigate = useNavigate();

  const signup = async (e: any) => {
    e.preventDefault();

    // Set isSignupProcess
    setIsSignupProcessing(true);

    if (
      getCpPassword.trim().length == 0 ||
      getPassword.trim().length == 0 ||
      getEmail.trim().length == 0 ||
      getFullname.trim().length == 0 ||
      getPhonenumber.trim().length == 0
    ) {
      toast.error("Fill all Inputs", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setIsSignupProcessing(false);
      return;
    }

    if (getPassword != getCpPassword) {
      toast.error("Passwords do not match", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setIsSignupProcessing(false);
      return;
    }

    apiUrlV1
      .post("/auth/signup", {
        fullName: getFullname,
        email: getEmail,
        userType: 2,
        phoneNumber: getPhonenumber,
        password: getPassword,
      })
      .then((response) => {
        setIsSignupProcessing(false);
        const data = response.data.data;

        navigate("/login");
        toast.error("You're not allowed to access dashboard", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      })
      .catch((error) => {
        setIsSignupProcessing(false);
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
            Signup
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={signup}>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Fullname"
                name="fullname"
                fullWidth
                value={getFullname}
                onChange={handleFullname}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                name="email"
                fullWidth
                value={getEmail}
                onChange={handleEmail}
              />
            </MDBox>
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
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Confirm Password"
                name="cppassword"
                fullWidth
                value={getCpPassword}
                onChange={handleCpPassword}
              />
            </MDBox>
            <Grid container>
              <Grid item>
                <MDBox display="flex" alignItems="center">
                  <Link to="/login" style={linkStyle}>
                    {"I already have an account"}
                  </Link>
                </MDBox>
              </Grid>
            </Grid>

            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                type="submit"
                color="info"
                disabled={isSignupProcessing}
                fullWidth
              >
                signup
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

export default Signup;
