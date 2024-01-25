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
import Grid from "@mui/material/Grid";
import Footer from "components/Footer";
import DashboardLayout from "components/LayoutContainers/DashboardLayout";

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardNavbar from "components/Navbars/DashboardNavbar";
import MDButton from "components/MDButton";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { RootStateDrvierDocs, RootStateUsers } from "redux/store";
import { CircularProgress } from "@mui/material";
import apiUrlV1 from "utils/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import { IUser, setUsers } from "redux/features/users/usersSlice";
import getDriverDocs from "Api/getDriverDocs";
import { doc, setDocs, updateDoc } from "redux/features/DriverDocs/DocsSlice";
import getUsers from "Api/getUsers";

function DRequest(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const driverdocs = useSelector((state: RootStateDrvierDocs) => state.driverdocs.results);
  const users = useSelector((state: RootStateUsers) => state.users.results);
  const [request, setRequest] = useState<doc[]>([]);
  const token = localStorage.getItem("accessToken");

  const handleDenyBtn = () => {
    apiUrlV1
      .patch(`/admin/drivers/verify/${request[0].userId}?action=false`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data?.data[1];
        if (data) {
          dispatch(updateDoc(data));
          toast.success("Request Denied successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } else {
          toast.error("Error while denying request", {
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
        console.error("Error while denying request:", error.response);
        toast.error("Error while denying request", {
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

  const handleApproveBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    apiUrlV1
      .patch(`/admin/drivers/verify/${request[0].userId}?action=true`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data?.data[1];
        if (data) {
          dispatch(updateDoc(data));
          toast.success("Request Approved successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } else {
          toast.error("Error while approving request", {
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
        console.error("Error while approving request:", error.response);
        toast.error("Error while approving request", {
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
  const handlePendBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    apiUrlV1
      .patch(`/admin/drivers/verify/${request[0].userId}?action=pending`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data?.data[1];

        if (data) {
          dispatch(updateDoc(data));
          toast.success("Request pended successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } else {
          toast.error("Error while approving request", {
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
        console.error("Error while approving request:", error.response);
        toast.error("Error while approving request", {
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requests = await getDriverDocs();
        dispatch(setDocs(requests));

        const userData = await getUsers();
        dispatch(setUsers(userData));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (driverdocs.length === 0 || users.length === 0) {
      fetchData();
    } else {
      setIsLoading(false);
    }
    const req = driverdocs.filter((doc) => doc.id === parseInt(id, 10));
    setRequest(req);
  }, [dispatch, driverdocs.length, users.length, setIsLoading, id]);

  const getUserDet = (id: number): IUser[] => {
    return users.filter((user: IUser) => user.id === id);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={4}>
        <Grid container spacing={3}>
          {!isLoading ? (
            <>
              <Grid item xs={12} lg={9} sx={{ mx: "auto" }}>
                <Card sx={{ overflow: "visible" }}>
                  <MDBox px={3} py={5}>
                    <MDTypography variant="h5">User Details</MDTypography>
                    <MDTypography variant="p">
                      {getUserDet(request[0].userId).length > 0
                        ? getUserDet(request[0].userId)[0].fullName
                        : "Unknown User"}
                    </MDTypography>
                  </MDBox>
                </Card>
              </Grid>
              <Grid item xs={12} lg={9} sx={{ mx: "auto" }}>
                <MDBox mb={3}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Card id="DriverRequestTypeDelete">
                        <MDBox
                          pr={3}
                          display="flex"
                          justifyContent="space-between"
                          alignItems={{ xs: "flex-start", sm: "center" }}
                          flexDirection={{ xs: "column", sm: "row" }}
                        >
                          <MDBox p={3} lineHeight={1}>
                            <MDBox mb={1}>
                              <MDTypography variant="h5">
                                Managing driver verifications
                              </MDTypography>
                            </MDBox>
                            <MDTypography variant="button" color="text">
                              Approving requests will officially verify the driver. Denying requests
                              will reject the verification.
                            </MDTypography>
                          </MDBox>
                          <MDBox display="flex" flexDirection={{ xs: "column", sm: "row" }}>
                            <MDBox ml={{ xs: 0, sm: 1 }} mt={{ xs: 1, sm: 0 }}>
                              <MDButton
                                variant="gradient"
                                color="success"
                                sx={{ height: "100%" }}
                                onClick={handleApproveBtn}
                              >
                                Approve request
                              </MDButton>
                            </MDBox>
                            <MDBox ml={{ xs: 0, sm: 1 }} mt={{ xs: 1, sm: 0 }}>
                              <MDButton
                                variant="gradient"
                                color="error"
                                sx={{ height: "100%" }}
                                onClick={handleDenyBtn}
                              >
                                Deny request
                              </MDButton>
                            </MDBox>
                            <MDBox ml={{ xs: 0, sm: 1 }} mt={{ xs: 1, sm: 0 }}>
                              <MDButton
                                variant="gradient"
                                color="warning"
                                sx={{ height: "100%" }}
                                onClick={handlePendBtn}
                              >
                                Pend request
                              </MDButton>
                            </MDBox>
                          </MDBox>
                        </MDBox>
                      </Card>
                    </Grid>
                  </Grid>
                </MDBox>
              </Grid>
            </>
          ) : (
            <Grid item xs={12} lg={9} mb={4} sx={{ mx: "auto" }}>
              <Card id="loading">
                <MDBox sx={{ position: "relative", mx: "auto", width: 100, p: 13.5 }}>
                  <CircularProgress />
                </MDBox>
              </Card>
            </Grid>
          )}
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default DRequest;
