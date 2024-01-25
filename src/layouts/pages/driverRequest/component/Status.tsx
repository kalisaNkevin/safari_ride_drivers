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
import MDTypography from "components/MDTypography";

function Status(status: string): JSX.Element {
  let color = "";

  switch (status) {
    case "pending":
      color = "warning";
      break;
    case "true":
      color = "success";
      break;
    case "false":
      color = "error";
      break;
    default:
      color = "";
  }

  return (
    <MDBox alignItems="center" pr={2}>
      <MDTypography color={color} variant="button" fontWeight="medium">
        {status}
      </MDTypography>
    </MDBox>
  );
}

export default Status;
