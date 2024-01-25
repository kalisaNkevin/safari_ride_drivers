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

// ProductPage page components
import MDBadge from "components/MDBadge";
import { useEffect, useState } from "react";
import getUsers from "Api/getUsers";
import { useDispatch, useSelector } from "react-redux";
import { IUser, setUsers } from "redux/features/users/usersSlice";
import { RootStateUsers } from "redux/store";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";

// Import default user profile
import defaultImg from "assets/images/user/default.png";
import formatDate from "utils/DateFormat";

function ViewAdmin(): JSX.Element {
  // Get id from url
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [getUser, setUser] = useState<IUser[]>([]);
  const dispatch = useDispatch();
  const users = useSelector((state: RootStateUsers) => state.users.results);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUsers();
        dispatch(setUsers(userData));
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const filteredUser = users.find((user) => user.id === parseInt(id));

    // Check if the filtered user is already in state and if it matches the current id
    if (!filteredUser || filteredUser.id !== parseInt(id)) {
      fetchData();
    } else {
      setUser([filteredUser]);
      setIsLoading(false);
    }
  }, [dispatch, id, users]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Card sx={{ overflow: "visible" }}>
          {!isLoading ? (
            <MDBox p={3}>
              <MDBox mb={3}>
                <MDTypography variant="h5" fontWeight="medium">
                  {getUser[0].userType.name.toString().charAt(0).toUpperCase() +
                    getUser[0].userType.name.toString().slice(1)}{" "}
                  details
                </MDTypography>
              </MDBox>

              <Grid container spacing={3}>
                <Grid item xs={12} lg={5} xl={4}>
                  <MDBox
                    component="img"
                    src={getUser[0].profileImage != null ? getUser[0].profileImage : defaultImg}
                    alt="Product Image"
                    shadow="lg"
                    borderRadius="lg"
                    width="100%"
                    sx={{ width: 500, height: 450 }}
                  />
                </Grid>
                <Grid item xs={12} lg={6} sx={{ mx: "auto" }}>
                  <MDBox>
                    <MDBox mb={1}>
                      <MDTypography variant="h3" fontWeight="bold">
                        {getUser[0].fullName}
                      </MDTypography>
                    </MDBox>
                    <MDBadge
                      variant="contained"
                      color={getUser[0].isVerified ? "success" : "error"}
                      badgeContent={getUser[0].isVerified ? "ACTIVE" : "INACTIVE"}
                      container
                    />
                    <MDBox mt={3} mb={0.5} ml={0.5}>
                      <MDTypography variant="button" fontWeight="regular" color="text">
                        Email: {getUser[0].email == null ? "Unknown" : getUser[0].email}
                      </MDTypography>
                    </MDBox>
                    <MDBox mt={0.5} mb={0.5} ml={0.5}>
                      <MDTypography variant="button" fontWeight="regular" color="text">
                        Phone number: {getUser[0].phoneNumber}
                      </MDTypography>
                    </MDBox>
                    <MDBox mt={0.5} mb={0.5} ml={0.5}>
                      <MDTypography variant="button" fontWeight="regular" color="text">
                        Emergency number:{" "}
                        {getUser[0].emergencyNumber == null
                          ? "Unknown"
                          : getUser[0].emergencyNumber}
                      </MDTypography>
                    </MDBox>
                    <MDBox mt={0.5} mb={0.5} ml={0.5}>
                      <MDTypography variant="button" fontWeight="regular" color="text">
                        Gender: {getUser[0].gender == null ? "Unknown" : getUser[0].gender}
                      </MDTypography>
                    </MDBox>
                    <MDBox mt={0.5} mb={0.5} ml={0.5}>
                      <MDTypography variant="button" fontWeight="regular" color="text">
                        CreatedAt: {formatDate(getUser[0].createdAt)}
                      </MDTypography>
                    </MDBox>
                    {getUser[0].description != null ? (
                      <>
                        <MDBox mt={3} mb={1} ml={0.5}>
                          <MDTypography variant="button" fontWeight="regular" color="text">
                            Description
                          </MDTypography>
                        </MDBox>
                        <MDBox component="ul" m={0} pl={4} mb={2}>
                          <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                            <MDTypography
                              variant="body2"
                              color="text"
                              fontWeight="regular"
                              verticalAlign="middle"
                            >
                              {getUser[0].description}
                            </MDTypography>
                          </MDBox>
                        </MDBox>
                      </>
                    ) : (
                      ""
                    )}
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>
          ) : (
            <MDBox sx={{ position: "relative", mx: "auto", width: 100, p: 45 }}>
              <CircularProgress />
            </MDBox>
          )}
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ViewAdmin;
