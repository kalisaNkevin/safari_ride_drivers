/* eslint-disable react/jsx-no-undef */
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

import { ReactNode } from "react";

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import docs from "assets/images/notification/docs.png";
import { Avatar, Divider } from "@mui/material";
import { Image } from "mui-image";
import { DateTime, Duration } from "ts-luxon";

// Declaring props types for Transaction
interface Props {
  notificationType: number;
  title: string;
  content: string;
  createdAt: string;
  userId: number;
  isRead: boolean;
}

const formatDate = (utcTime: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const formattedDate = new Date(utcTime).toLocaleString("en-US", options);
  return formattedDate;
};

const calculateTimeDifference = (targetDate: string): string => {
  const currentDate = DateTime.now();
  const parsedTargetDate = DateTime.fromISO(targetDate);
  const diff = currentDate.diff(parsedTargetDate);
  console.log(currentDate);
  console.log(parsedTargetDate);
  console.log(diff);
  console.log(diff.years);

  if (diff.years >= 1) {
    return `${diff.years}Y`;
  } else if (diff.months >= 1) {
    return `${diff.months}M`;
  } else if (diff.days >= 1) {
    return `${diff.days}D`;
  } else if (diff.hours >= 1) {
    return `${diff.hours}H`;
  } else if (diff.minutes >= 1) {
    return `${diff.minutes}Min`;
  } else {
    return "0 min";
  }
};

const Notification: React.FC<Props> = ({
  notificationType,
  title,
  createdAt,
  content,
  isRead,
}: Props): JSX.Element => {
  return (
    <MDBox key={1} component="li" py={1} my={0}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center">
        <MDBox display="flex" alignItems="center">
          <MDBox mr={3}>
            <Image width={55} src={docs} />
          </MDBox>
          <MDBox display="flex" flexDirection="column">
            <MDTypography variant="h6" fontWeight="medium" gutterBottom>
              {title}
            </MDTypography>
            <MDTypography variant="caption" color="text" fontWeight="regular" gutterBottom>
              {content}
            </MDTypography>
            <MDTypography variant="caption" mt={1.5} color="text" fontWeight="regular">
              {formatDate(createdAt)}
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
      <Divider sx={{ margin: "0 !important", marginTop: "20px !important" }} />
    </MDBox>
  );
};

export default Notification;
