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

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import DoneIcon from "@mui/icons-material/Done";

// Images
import bgImage from "assets/images/bg-reset-cover.jpeg";
import { ChangeEvent, useState } from "react";
import apiUrlV1 from "utils/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

function ResetPassword(): JSX.Element {
  // States
  const [getPhoneNumber, setPhonenumber] = useState<string>();
  const [getPassword, setPassword] = useState<string>();
  const [isCodeSent, setCodeSent] = useState<boolean>(false);
  const [isResetProcessing, setResetProcessing] = useState<boolean>(false);
  const [getCode, setCode] = useState<number>();
  const [isReset, setIsReset] = useState<boolean>(false);

  const handlePhonenumber = (e: ChangeEvent<HTMLInputElement>) => setPhonenumber(e.target.value);
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const handleCode = (e: ChangeEvent<HTMLInputElement>) => setCode(parseInt(e.target.value));

  const sentRequest = async (e: any) => {
    e.preventDefault();

    // Set isResetProcess
    setResetProcessing(true);
    if (!isCodeSent) {
      apiUrlV1
        .post(`/auth/request-reset-password?phoneNumber=${getPhoneNumber}`)
        .then((response) => {
          setCodeSent(true);
          toast.success("Code sent successful", {
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
          console.log(error.response);
          setCodeSent(false);
          toast.error("Failed to send code, Please try again", {
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
        .finally(() => {
          setResetProcessing(false);
        });
    } else {
      apiUrlV1
        .post("/auth/reset-password", {
          phoneNumber: getPhoneNumber,
          code: getCode,
          password: getPassword,
        })
        .then((response) => {
          setIsReset(true);
          toast.success("Password reset successful!", {
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
          console.log(error.response);
          toast.error(`${error.response.data.message}, Please try again`, {
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
        .finally(() => {
          setResetProcessing(false);
        });
    }
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        {!isReset ? (
          <>
            <MDBox
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="success"
              mx={2}
              mt={-3}
              py={2}
              mb={1}
              textAlign="center"
            >
              <MDTypography variant="h3" fontWeight="medium" color="white" mt={1}>
                Reset Password
              </MDTypography>
              <MDTypography display="block" variant="button" color="white" my={1}>
                You will receive an sms
              </MDTypography>
            </MDBox>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox component="form" role="form">
                {isCodeSent ? (
                  <>
                    <MDBox mb={4}>
                      <MDInput
                        type="text"
                        label="New password"
                        value={getPassword}
                        onChange={handlePassword}
                        variant="standard"
                        fullWidth
                      />
                    </MDBox>
                    <MDBox mb={4}>
                      <MDInput
                        type="number"
                        label="Code"
                        value={getCode}
                        onChange={handleCode}
                        variant="standard"
                        fullWidth
                      />
                    </MDBox>
                  </>
                ) : (
                  <MDBox mb={4}>
                    <MDInput
                      type="text"
                      label="Phonenumber"
                      value={getPassword}
                      onChange={handlePhonenumber}
                      disabled={isCodeSent}
                      variant="standard"
                      fullWidth
                    />
                  </MDBox>
                )}

                <MDBox mt={6} mb={1}>
                  <MDButton
                    variant="gradient"
                    color="info"
                    disabled={isResetProcessing}
                    onClick={sentRequest}
                    fullWidth
                  >
                    reset
                  </MDButton>
                </MDBox>
              </MDBox>
            </MDBox>
          </>
        ) : (
          <MDBox py={10} px={3} sx={{ textAlign: "center" }}>
            <MDBox>
              <DoneIcon sx={{ fontSize: "4em !important", color: "green" }} />
            </MDBox>
            <MDBox>
              <MDTypography variant="h5" fontWeight="medium" color="black" mt={1}>
                Password Changed!
              </MDTypography>
              <MDTypography variant="h6" fontWeight="medium" color="black" mt={1}>
                Password reset successful! You can now <Link to="/login">log in</Link> with your new
                password.
              </MDTypography>
            </MDBox>
          </MDBox>
        )}
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

export default ResetPassword;
