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
import VehicleTypeCell from "./component/VehicleTypeCell";
import DataTable from "components/Tables/DataTable";
import VehicleTypeIcon from "assets/images/icons/VehicleTypeIcon.png";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { RootStateVTypes } from "redux/store";
import getVehicleTypes from "Api/getVehicleType";
import { addVehicleTypes, setVehicleTypes } from "redux/features/vehicles/vehicleTypeSlice";
import { CircularProgress } from "@mui/material";
import apiUrlV1 from "utils/axiosInstance";

// React-toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import formatDate from "utils/DateFormat";

function VehicleTypes(): JSX.Element {
  const columns = [
    { Header: "id", accessor: "id", align: "center" },
    { Header: "Vehicle Type", accessor: "type" },
    { Header: "Created At", accessor: "CreatedAt", align: "center" },
    { Header: "Action", accessor: "action" },
  ];

  const dispatch = useDispatch();
  const navigator = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const vehicleTypes = useSelector((state: RootStateVTypes) => state.vehicleTypes.results);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const types = await getVehicleTypes();
        dispatch(setVehicleTypes(types));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    if (vehicleTypes.length === 0) {
      fetchData();
    } else {
      setIsLoading(false);
    }
  }, [dispatch, isLoading]);

  const rows = vehicleTypes.map((type) => ({
    id: type.id,
    type: <VehicleTypeCell image={!type.icon ? VehicleTypeIcon : type.icon} name={type.name} />,
    CreatedAt: formatDate(type.createdAt),
    action: (
      <MDButton
        variant="contained"
        color="dark"
        size="small"
        onClick={() => navigator(`/vehicle/types/${type.id}`)}
      >
        More
      </MDButton>
    ),
  }));

  const [getTypeName, setTypeName] = useState<string>("");
  const [getTypeIcon, setTypeIcon] = useState<File | string>();

  const handleChangeTypeName = (e: ChangeEvent<HTMLInputElement>) => {
    setTypeName(e.target.value);
  };
  const handleChangeTypeIcon = (e: ChangeEvent<HTMLInputElement>) => {
    setTypeIcon(e.target.value);
  };

  const handleSaveType = (e: any) => {
    e.preventDefault();
    console.log("submit something");

    const token = localStorage.getItem("accessToken");
    apiUrlV1
      .post(
        "/admin/vehicles/types",
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
        const data = response.data["data"];
        setTypeIcon("");
        setTypeName("");

        if (data) {
          const newVtype = {
            id: data.id,
            name: data.name,
            active: data.active,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            icon: data.icon,
          };

          dispatch(addVehicleTypes(newVtype));
          toast.success("New vehicle type addedd added successfully", {
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
        toast.error("Couldn't add new type", {
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

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox
        py={3}
        sx={{
          overflow: "visible",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "start",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} lg={3}>
            <Card sx={{ overflow: "visible" }}>
              <MDBox px={3} py={5}>
                <MDBox component="form" role="form" onSubmit={handleSaveType}>
                  <MDBox mb={3} sx={{ display: "flex", justifyContent: "space-between" }}>
                    <MDBox>
                      <MDTypography variant="h5" fontWeight="medium">
                        New Vehicle Type
                      </MDTypography>
                    </MDBox>
                    <MDBox>
                      <MDButton variant="gradient" type="submit" color="info" fullWidth>
                        Save
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
          <Grid item xs={12} lg={9}>
            <MDBox mb={3}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Card sx={{ overflow: "visible" }}>
                    {!isLoading ? (
                      <MDBox p={3}>
                        <MDBox mt={8} mb={2}>
                          <MDBox mb={1} ml={2}>
                            <MDTypography variant="h5" fontWeight="medium">
                              Vehicle Types
                            </MDTypography>
                          </MDBox>
                          <DataTable
                            table={{ columns, rows }}
                            entriesPerPage={false}
                            showTotalEntries={false}
                            isSorted={true}
                          />
                        </MDBox>
                      </MDBox>
                    ) : (
                      <MDBox sx={{ position: "relative", mx: "auto", width: 100, p: 13.5 }}>
                        <CircularProgress />
                      </MDBox>
                    )}
                  </Card>
                </Grid>
              </Grid>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default VehicleTypes;
