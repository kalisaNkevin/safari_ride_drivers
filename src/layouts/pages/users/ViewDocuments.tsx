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
import Footer from "components/Footer";
import DashboardLayout from "components/LayoutContainers/DashboardLayout";

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardNavbar from "components/Navbars/DashboardNavbar";
import { ChangeEvent, useState } from "react";
import { Button, Grid, Paper, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import apiUrlV1 from "utils/axiosInstance";
import { toast } from "react-toastify";
import MDButton from "components/MDButton";

function ViewDocs(): JSX.Element {
  // Get id from url

  const [file, setFile] = useState([]);
  const [uploading, setUploading] = useState(false);
  const token = localStorage.getItem("accessToken");

  const [files, setFiles] = useState([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFiles([...e.target.files]);
  };

  const renderFilePreviews = () => {
    return files.map((file, index) => (
      <Paper key={index} elevation={3} style={{ padding: 10, margin: 10 }}>
        <img
          src={URL.createObjectURL(file)}
          alt={`Preview-${index}`}
          style={{ maxWidth: "100%", maxHeight: 200 }}
        />
      </Paper>
    ));
  };

  const handleUpload = async () => {
    const formData = new FormData();

    formData.append("identityCard", files[0]);
    formData.append("faceImage", files[1]);
    formData.append("driverLicence", files[2]);
    setUploading(true);

    apiUrlV1
      .post(`driver/verify-driver`, formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setUploading(false);
      })
      .catch((error) => {
        if ((error as any).response?.data?.message) {
          toast.error((error as any).response.data.message, {
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
        setUploading(false);
        console.error("Make sure you are uploading all 3 files:", error.response);
      });
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Card sx={{ overflow: "visible" }}>
          <MDBox p={3}>
            <MDBox mb={3}>
              <MDTypography variant="h5" fontWeight="medium">
                Upload document
              </MDTypography>
              Kindly submit clear copies of your identity card, driving license, and passport photo
              for verification.
            </MDBox>
          </MDBox>
        </Card>
      </MDBox>
      <MDBox py={3}>
        <Card sx={{ overflow: "visible" }}>
          <MDBox p={3}>
            <MDBox mb={3}>
              <div>
                <input
                  type="file"
                  onChange={handleFileChange}
                  multiple
                  style={{ display: "none" }}
                  id="fileInput"
                />
                <label htmlFor="fileInput">
                  <MDBox ml={{ xs: 0, sm: 1 }} mt={{ xs: 1, sm: 0 }}>
                    <MDButton
                      variant="contained"
                      color="success"
                      sx={{ height: "100%" }}
                      component="span"
                      startIcon={<CloudUploadIcon sx={{ marginRight: 1 }} />}
                    >
                      Select Files
                    </MDButton>
                  </MDBox>
                </label>

                {files.length > 0 && (
                  <div>
                    <Typography variant="h6" style={{ margin: "20px 0" }}>
                      Selected Files:
                    </Typography>
                    <Grid container spacing={2}>
                      {renderFilePreviews()}
                    </Grid>
                    <MDBox ml={{ xs: 0, sm: 1 }} mt={{ xs: 1, sm: 0 }}>
                      <MDButton
                        variant="gradient"
                        color="success"
                        sx={{ height: "100%" }}
                        onClick={handleUpload}
                      >
                        {uploading ? "uploading..." : "Upload Files"}
                      </MDButton>
                    </MDBox>
                  </div>
                )}
              </div>
            </MDBox>
          </MDBox>
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ViewDocs;
