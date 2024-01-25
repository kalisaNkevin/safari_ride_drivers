/* eslint-disable react/no-unescaped-entities */
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
import Report from "./component/Report";
import Footer from "components/Footer";
import DashboardLayout from "components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "components/Navbars/DashboardNavbar";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStateReports } from "redux/store";
import getReports from "Api/getReports";
import { deleteReport, setReports } from "redux/features/reports/reportsSlice";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { CircularProgress } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import apiUrlV1 from "utils/axiosInstance";

function Reports(): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const Reports = useSelector((state: RootStateReports) => state.reports.results);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getReports();
        dispatch(setReports(userData));
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (Reports.length === 0) {
      fetchData();
    } else {
      setIsLoading(false);
    }
  }, [dispatch, Reports]);

  // Deleting report
  const handleDeleteBtn = (id: number) => {
    const token = localStorage.getItem("accessToken");
    apiUrlV1
      .delete(`/reports/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch(deleteReport(id));
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
      })
      .catch((error) => {
        toast.error("Failed to report, try again", {
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

  const generateReportContent = () => {
    if (isLoading) {
      return (
        <MDBox sx={{ position: "relative", mx: "auto", width: 100, p: 45 }}>
          <CircularProgress />
        </MDBox>
      );
    }

    if (Reports.length === 0) {
      return (
        <>
          <MDBox pt={3} px={2}>
            <MDTypography variant="h6" fontWeight="medium">
              Report Problem
            </MDTypography>
          </MDBox>
          <MDBox sx={{ position: "relative", mx: "auto", width: 200, py: 4, textAlign: "center" }}>
            <PriorityHighIcon sx={{ fontSize: "3em !important" }} />
            <MDTypography variant="h6" fontWeight="medium">
              Couldn't find any report
            </MDTypography>
          </MDBox>
        </>
      );
    }

    return (
      <>
        <MDBox pt={3} px={2}>
          <MDTypography variant="h6" fontWeight="medium">
            Report Problem
          </MDTypography>
        </MDBox>
        <MDBox pt={1} pb={2} px={2}>
          <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
            {Reports.map((report) => (
              <Report
                id={report.id}
                fullName={report.fullName || "_"}
                email={report.email || "_"}
                phoneNumber={report.phoneNumber || "_"}
                title={report.title || "_"}
                description={report.description || "_"}
                key={report.id}
                deletHandle={handleDeleteBtn}
              />
            ))}
          </MDBox>
        </MDBox>
      </>
    );
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Card id="Report-Problem">{generateReportContent()}</Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Reports;
