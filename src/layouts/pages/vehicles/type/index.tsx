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
import DataTable from "components/Tables/DataTable";
import VehicleTypeIcon from "assets/images/icons/VehicleTypeIcon.png";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { RootStateVTypes } from "redux/store";
import getVehicleTypes from "Api/getVehicleType";
import {
  deleteVehicleTypes,
  setVehicleTypes,
  updateVehicleTypes,
} from "redux/features/vehicles/vehicleTypeSlice";
import { CircularProgress } from "@mui/material";
import apiUrlV1 from "utils/axiosInstance";
import MDAvatar from "components/MDAvatar";
import { ToastContainer, toast } from "react-toastify";

function VehicleType(): JSX.Element {
  // Get id from url
  const { id } = useParams<{ id: string }>();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const vehicleTypes = useSelector((state: RootStateVTypes) => state.vehicleTypes.results);
  const [filteredVehicles, setFilteredVehicles] = useState([]);

  // Inputs State
  const [getTypeName, SetTypeName] = useState<string>();
  const [getTypeIcon, setTypeIcon] = useState<string>();

  const handleChangeTypeName = (e: ChangeEvent<HTMLInputElement>) => {
    SetTypeName(e.target.value);
  };
  const handleChangeTypeIcon = (e: ChangeEvent<HTMLInputElement>) => {
    setTypeIcon(e.target.value);
  };

  const token = localStorage.getItem("accessToken");
  const handleDeleteBtn = () => {
    apiUrlV1
      .delete(`/admin/vehicles/types/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch(deleteVehicleTypes(parseInt(id)));
        toast.success("Deleted successful", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate("/vehicle/types");
      })
      .catch((error) => {
        toast.error("Failed to delete vehicle type, try again", {
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

  const handleUpdateType = (e: any) => {
    e.preventDefault();

    apiUrlV1
      .patch(
        `/admin/vehicles/types/${id}`,
        {
          name: getTypeName,
          icon: getTypeIcon,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        const data = response.data["data"][1];
        if (data) {
          const newVehicleType = {
            id: data.id,
            name: data.name,
            icon: data.icon,
            active: data.active,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
          };

          dispatch(updateVehicleTypes(newVehicleType));
          toast.success("VehicleType updated successfully", {
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
          console.error("Invalid API response format:", response);
          toast.error("Invalid API response format", {
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
        console.log(error.response);
        toast.error("Couldn't update vehicle type", {
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
        const userData = await getVehicleTypes();
        dispatch(setVehicleTypes(userData));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (vehicleTypes.length === 0) {
      fetchData();
    } else {
      const vType = vehicleTypes.filter((type) => type.id === parseInt(id, 10));
      if (vType.length != 0) {
        setFilteredVehicles(vType);
        SetTypeName(vType[0].name);
        setTypeIcon(vType[0].icon);
      }
      setIsLoading(false);
    }
  }, [dispatch, id, vehicleTypes]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={4}>
        <Grid container spacing={3}>
          {!isLoading ? (
            <>
              <Grid item xs={12} lg={9} sx={{ mx: "auto" }}>
                <Card id="vehicleTypeDetail">
                  <MDBox p={2}>
                    <Grid container spacing={3} alignItems="center">
                      <Grid item>
                        <MDAvatar
                          src={
                            !filteredVehicles[0].icon ? VehicleTypeIcon : filteredVehicles[0].icon
                          }
                          alt={filteredVehicles[0].icon}
                          size="xl"
                          shadow="sm"
                        />
                      </Grid>
                      <Grid item>
                        <MDBox height="100%" mt={0.5} lineHeight={1}>
                          <MDTypography variant="h5" fontWeight="medium">
                            {filteredVehicles[0].name}
                          </MDTypography>
                        </MDBox>
                      </Grid>
                    </Grid>
                  </MDBox>
                </Card>
              </Grid>
              <Grid item xs={12} lg={9} sx={{ mx: "auto" }}>
                <Card sx={{ overflow: "visible" }}>
                  <MDBox px={3} py={5}>
                    <MDBox component="form" role="form" onSubmit={handleUpdateType}>
                      <MDBox mb={3} sx={{ display: "flex", justifyContent: "space-between" }}>
                        <MDBox>
                          <MDTypography variant="h5" fontWeight="medium">
                            Edit Vehicle Type
                          </MDTypography>
                        </MDBox>
                        <MDBox>
                          <MDButton variant="gradient" type="submit" color="dark" fullWidth>
                            Update
                          </MDButton>
                        </MDBox>
                      </MDBox>
                      <MDBox mb={2}>
                        <MDInput
                          type="text"
                          label="Type name"
                          name="name"
                          fullWidth
                          value={getTypeName}
                          onChange={handleChangeTypeName}
                        />
                      </MDBox>
                      <MDBox mb={2}>
                        <MDInput
                          type="text"
                          label="Icon Url"
                          name="icon"
                          fullWidth
                          value={getTypeIcon}
                          onChange={handleChangeTypeIcon}
                        />
                      </MDBox>
                    </MDBox>
                  </MDBox>
                </Card>
              </Grid>
              <Grid item xs={12} lg={9} sx={{ mx: "auto" }}>
                <MDBox mb={3}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Card id="vehicleTypeDelete">
                        <MDBox
                          pr={3}
                          display="flex"
                          justifyContent="space-between"
                          alignItems={{ xs: "flex-start", sm: "center" }}
                          flexDirection={{ xs: "column", sm: "row" }}
                        >
                          <MDBox p={3} lineHeight={1}>
                            <MDBox mb={1}>
                              <MDTypography variant="h5">Delete vehicle type</MDTypography>
                            </MDBox>
                            <MDTypography variant="button" color="text">
                              Once you delete this type, there is no going back. Please be certain.
                            </MDTypography>
                          </MDBox>
                          <MDBox display="flex" flexDirection={{ xs: "column", sm: "row" }}>
                            <MDBox ml={{ xs: 0, sm: 1 }} mt={{ xs: 1, sm: 0 }}>
                              <MDButton
                                variant="gradient"
                                color="error"
                                sx={{ height: "100%" }}
                                onClick={handleDeleteBtn}
                              >
                                delete type
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

export default VehicleType;
