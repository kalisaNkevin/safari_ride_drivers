/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "components/Navbars/DashboardNavbar";
import Footer from "components/Footer";
import Notification from "./components/Notification";
import { useDispatch, useSelector } from "react-redux";
import { RootStateNotif } from "redux/store";
import { setNotifications } from "redux/features/notifications/notificationsSlice";
import { CircularProgress } from "@mui/material";
import getNotifications from "Api/getNotifications";

function Notifications(): JSX.Element {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const notifications = useSelector((state: RootStateNotif) => state.notifications.results);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedNotifications = await getNotifications();
        dispatch(setNotifications(fetchedNotifications));
      } catch (error) {
        console.error("Error fetching Notifications:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (notifications.length === 0) {
      fetchData();
    } else {
      setIsLoading(false);
    }
  }, [dispatch, notifications]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox mt={6} mb={3}>
          <Grid container justifyContent="center">
            <CircularProgress />
          </Grid>
        </MDBox>
        <Footer />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={5}>
            <Card>
              <MDBox p={2} lineHeight={0}>
                <MDTypography variant="h5">Notifications</MDTypography>
                <MDTypography variant="button" color="text" fontWeight="regular">
                  Notifications on this page use Toasts from Bootstrap. Read more details here.
                </MDTypography>
              </MDBox>
              <MDBox p={2}>
                <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                  Newest
                </MDTypography>
                <MDBox
                  component="ul"
                  sx={{ listStyle: "none" }}
                  display="flex"
                  flexDirection="column"
                  p={0}
                  mt={2}
                >
                  {notifications?.length !== 0 ? (
                    notifications?.map(
                      ({ id, title, content, createdAt, notificationTypeId, isRead }) => (
                        <Notification
                          key={id}
                          title={title}
                          content={content}
                          isRead={isRead}
                          createdAt={createdAt}
                          notificationType={notificationTypeId}
                          userId={id}
                        />
                      )
                    )
                  ) : (
                    <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                      There's no available notifications right now
                    </MDTypography>
                  )}
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

export default Notifications;
