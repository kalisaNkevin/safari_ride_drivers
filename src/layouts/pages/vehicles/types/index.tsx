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
import { Autocomplete, CircularProgress } from "@mui/material";
import apiUrlV1 from "utils/axiosInstance";

// React-toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import formatDate from "utils/DateFormat";

function VehicleTypes(): JSX.Element {
  const columns = [
    { Header: "Vehicle Type", accessor: "type" },
    { Header: "Vehicle plate", accessor: "plate", align: "center" },
  ];

  const dispatch = useDispatch();
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
  }));

  const [plateNumber, setPlateNumber] = useState<string>("");

  const handleChangePlateNumber = (e: ChangeEvent<HTMLInputElement>) => {
    setPlateNumber(e.target.value);
  };

  const handleSaveType = (e: any) => {
    e.preventDefault();
    console.log("submit something");

    const token = localStorage.getItem("accessToken");
    apiUrlV1
      .post(
        "/driver/vehicles/add",
        {
          plateNumber,
          vehicleTypeId: 99994,
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
        setPlateNumber("");

        if (data) {
          const newVtype = {
            id: data.id,
            name: data.name,
            active: data.active,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            icon: data.icon,
          };

          toast.success("Your vehicle has been updated successfully", {
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
        toast.error("You can not add more than one car", {
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
                        My car type
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
                      label="Plate number"
                      name="name"
                      fullWidth
                      value={plateNumber}
                      onChange={handleChangePlateNumber}
                    />
                  </MDBox>
                  <MDBox mb={3}>
                    <MDBox mb={1.625} display="inline-block">
                      <MDTypography
                        component="label"
                        variant="button"
                        fontWeight="regular"
                        color="text"
                        textTransform="capitalize"
                      >
                        Vehicle type
                      </MDTypography>
                    </MDBox>
                    <Autocomplete
                      defaultValue="Sedan"
                      options={["Sedan", "SUV", "Pickup", "Van", "Hatchback"]}
                      renderInput={(params) => <MDInput {...params} variant="standard" />}
                    />
                  </MDBox>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default VehicleTypes;
