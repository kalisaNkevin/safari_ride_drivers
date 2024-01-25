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

import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";

function Header(): JSX.Element {
  const [visible, setVisible] = useState<boolean>(true);

  const handleSetVisible = () => setVisible(!visible);

  return (
    <Card id="driver-header">
      <MDBox py={2} px={4}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
                Search Driver
              </MDTypography>
              <MDTypography variant="button" color="text" fontWeight="medium">
                Find any driver may need
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={2} lg={2} sx={{ ml: "auto" }}>
            <MDBox pr={1}>
              <MDInput label="Search here" />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </Card>
  );
}

export default Header;
