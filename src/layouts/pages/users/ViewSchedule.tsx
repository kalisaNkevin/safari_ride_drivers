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
import {
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import getSchedules from "Api/getSchedules";
import { useDispatch, useSelector } from "react-redux";
import { ISchedule, setSchedules } from "redux/features/schedules/schedulesSlice";
import { RootStateSchedules } from "redux/store";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import DataTable from "components/Tables/DataTable";
import ProductCell from "./components/ProductCell";
import DefaultCell from "./components/DefaultCell";

// Images
import MDButton from "components/MDButton";
import Status from "./components/Status";
import { toast } from "react-toastify";
import apiUrlV1 from "utils/axiosInstance";

// Import default schedule profile

function ViewSchedule(): JSX.Element {
  // Get id from url
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [getSchedule, setSchedule] = useState<ISchedule[]>([]);
  const [getRequests, setRequest] = useState<any[]>([]);
  const dispatch = useDispatch();
  const schedules = useSelector((state: RootStateSchedules) => state.schedules.results);
  const token = localStorage.getItem("accessToken");
  const [buttonAction, setButtonAction] = useState<string | null>(null);

  useEffect(() => {
    console.log("hi");
    if (buttonAction === "approve" || buttonAction === "deny") {
      console.log("clicked");
      setButtonAction(null);
    }
  }, [buttonAction]);

  const handleDenyBtn = (id: any) => {
    apiUrlV1
      .patch(`driver/schedules/booking/${id}?action=false`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data?.data[1];
        if (data) {
          setButtonAction("deny");
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

  const handleApproveBtn = (id: any) => {
    apiUrlV1
      .patch(`driver/schedules/booking/${id}?action=true`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data?.data[1];
        if (data) {
          setButtonAction("approve");
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

  const dataTableData = {
    columns: [
      { Header: "passenger", accessor: "passenger", width: "40%" },
      { Header: "phone number", accessor: "phonenumber", width: "10%" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],
    rows: getRequests,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const scheduleData = await getSchedules();
        dispatch(setSchedules(scheduleData));
      } catch (error) {
        console.error("Error fetching schedule data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const filteredSchedule = schedules.find((schedule) => schedule.id === parseInt(id));

    // Check if the filtered schedule is already in state and if it matches the current id
    if (!filteredSchedule || filteredSchedule.id !== parseInt(id)) {
      fetchData();
    } else {
      setSchedule([filteredSchedule]);
      const tempRequests = filteredSchedule.client_schedules.map(
        (request: {
          id: any;
          client: {
            profileImage: string;
            fullName: string;
            phoneNumber:
              | string
              | number
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | ReactFragment
              | ReactPortal;
          };
          status: string;
        }) => ({
          passenger: (
            <ProductCell image={request.client.profileImage} name={request.client.fullName} />
          ),
          phonenumber: <DefaultCell>{request.client.phoneNumber}</DefaultCell>,
          status: Status(request.status),
          action: (
            <MDBox display="flex" flexDirection={{ xs: "column", sm: "row" }}>
              <MDBox ml={{ xs: 0, sm: 1 }} mt={{ xs: 1, sm: 0 }}>
                <MDButton
                  variant="gradient"
                  color="success"
                  sx={{ height: "100%" }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleApproveBtn(request.id);
                  }}
                >
                  Approve request
                </MDButton>
              </MDBox>
              <MDBox ml={{ xs: 0, sm: 1 }} mt={{ xs: 1, sm: 0 }}>
                <MDButton
                  variant="gradient"
                  color="error"
                  sx={{ height: "100%" }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleDenyBtn(request.id);
                  }}
                >
                  Deny request
                </MDButton>
              </MDBox>
            </MDBox>
          ),
        })
      );

      setRequest(tempRequests);
      setIsLoading(false);
    }
  }, [dispatch, id, schedules, buttonAction]);

  function formatTime(date: any) {
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Card sx={{ overflow: "visible" }}>
          {!isLoading ? (
            <MDBox p={3}>
              <MDBox mb={3}>
                <MDTypography variant="h5" fontWeight="medium">
                  Trip details
                </MDTypography>
              </MDBox>

              <Grid container spacing={3}>
                <Grid item xs={12} lg={5} xl={4}>
                  <MDBox
                    component="img"
                    src={getSchedule[0].vehicle.vehicleType.icon}
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
                        {getSchedule[0].from.split(",")[0]}, {getSchedule[0].to.split(",")[0]}
                      </MDTypography>
                    </MDBox>
                    <MDBox mt={3} mb={0.5} ml={0.5}>
                      <MDTypography variant="button" fontWeight="bold" color="text">
                        Pickup:{" "}
                      </MDTypography>
                      <MDTypography variant="button" fontWeight="regular" color="text">
                        {getSchedule[0].from}
                      </MDTypography>
                    </MDBox>
                    <MDBox mt={0.5} mb={0.5} ml={0.5}>
                      <MDTypography variant="button" fontWeight="bold" color="text">
                        Dropoff:{" "}
                      </MDTypography>
                      <MDTypography variant="button" fontWeight="regular" color="text">
                        {getSchedule[0].to}
                      </MDTypography>
                    </MDBox>
                    <MDBox mt={0.5} mb={0.5} ml={0.5}>
                      <MDTypography variant="button" fontWeight="bold" color="text">
                        Seats:{" "}
                      </MDTypography>
                      <MDTypography variant="button" fontWeight="regular" color="text">
                        {getSchedule[0].sits}
                      </MDTypography>
                    </MDBox>
                    <MDBox mt={0.5} mb={0.5} ml={0.5}>
                      <MDTypography variant="button" fontWeight="bold" color="text">
                        Price:{" "}
                      </MDTypography>
                      <MDTypography variant="button" fontWeight="regular" color="text">
                        {getSchedule[0].fareAmount}
                      </MDTypography>
                    </MDBox>

                    <MDBox mt={0.5} mb={0.5} ml={0.5}>
                      <MDTypography variant="button" fontWeight="bold" color="text">
                        Leaving:
                      </MDTypography>
                      <MDTypography variant="button" fontWeight="regular" color="text">
                        {" "}
                        {`${months[new Date(getSchedule[0].date).getUTCMonth()]} ${new Date(
                          getSchedule[0].date
                        ).getUTCDate()}, ${new Date(
                          getSchedule[0].date
                        ).getUTCFullYear()} | ${formatTime(new Date(getSchedule[0].date))}`}
                      </MDTypography>
                    </MDBox>
                    {getSchedule[0].description != null ? (
                      <>
                        <MDBox mt={3} mb={1} ml={0.5}>
                          <MDTypography variant="button" fontWeight="bold" color="text">
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
                              {getSchedule[0].description}
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
        <MDBox mt={8} mb={2}>
          <MDBox mb={1} ml={2}>
            <MDTypography variant="h5" fontWeight="medium">
              Ride Requests
            </MDTypography>
          </MDBox>
          <DataTable
            table={dataTableData}
            entriesPerPage={false}
            showTotalEntries={false}
            isSorted={false}
          />
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ViewSchedule;
