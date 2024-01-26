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

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";

// Material Dashboard 2 PRO React TS examples components
import DashboardLayout from "components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "components/Navbars/DashboardNavbar";
import Footer from "components/Footer";
import DataTable from "components/Tables/DataTable";
import MDButton from "components/MDButton";
import { useDispatch, useSelector } from "react-redux";
import { RootStateSchedules } from "redux/store";
import { useEffect, useState } from "react";
import getSchedules from "Api/getSchedules";
import { setSchedules } from "redux/features/schedules/schedulesSlice";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Passengers(): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const columns = [
    { Header: "From", accessor: "from" },
    { Header: "to", accessor: "to" },
    { Header: "Leaving", accessor: "leaving" },
    { Header: "Action", accessor: "action" },
  ];

  const dispatch = useDispatch();
  const navigator = useNavigate();
  const schedules = useSelector((state: RootStateSchedules) => state.schedules.results);

  const GetAllScheduleDetails = (scheduleId: number): void => {
    navigator(`/schedule/${scheduleId}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const scheduleData = await getSchedules();
        dispatch(setSchedules(scheduleData));
      } catch (error) {
        console.error("Error fetching schedules data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (schedules.length === 0) {
      fetchData();
    } else {
      setIsLoading(false);
    }
  }, [dispatch, schedules]);

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

  const rows = schedules.map((schedule) => ({
    from: schedule.from,
    to: schedule.to,
    leaving: ` ${days[new Date(schedule.date).getUTCDay()]} ${
      months[new Date(schedule.date).getUTCMonth()]
    } ${new Date(schedule.date).getUTCDate()} | ${formatTime(new Date(schedule.date))}`,
    action: (
      <MDButton
        variant="outlined"
        color="info"
        size="small"
        onClick={() => GetAllScheduleDetails(schedule.id)}
      >
        View more
      </MDButton>
    ),
  }));

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {!isLoading ? (
        <DataTable
          table={{ columns: columns, rows: rows }}
          entriesPerPage={false}
          showTotalEntries={false}
          isSorted={true}
          canSearch
        />
      ) : (
        <MDBox sx={{ position: "relative", mx: "auto", width: 100, p: 45 }}>
          <CircularProgress />
        </MDBox>
      )}
      <MDBox
        sx={{
          position: "relative",
          mt: 3,
        }}
      />
      <Footer />
    </DashboardLayout>
  );
}

export default Passengers;
