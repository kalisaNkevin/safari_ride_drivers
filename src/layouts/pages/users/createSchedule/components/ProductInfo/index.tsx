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

import { ChangeEvent, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// NewProduct page components
import FormField from "../FormField";
import MDButton from "components/MDButton";
import apiUrlV1 from "utils/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import getSchedules from "Api/getSchedules";
import { setSchedules } from "redux/features/schedules/schedulesSlice";
import { useDispatch } from "react-redux";

function ProductInfo(): JSX.Element {
  const [startDate, setDate] = useState(new Date());
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const [sits, setSits] = useState("0");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [fareAmount, setFareAmount] = useState("0");
  const [description, setDescription] = useState<string>(``);
  const defaultEndDate = new Date();
  defaultEndDate.setDate(defaultEndDate.getDate() + 7);
  const today = new Date();
  const selectDateHandler = (d: any) => {
    setDate(d);
  };
  const token = localStorage.getItem("accessToken");

  const onCreatePressed = async () => {
    apiUrlV1
      .post(
        `driver/schedules/add`,
        {
          sits,
          fareAmount,
          from,
          to,
          date: startDate,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(async (response) => {
        toast.success("Trip scheduled successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        const scheduleData = await getSchedules();
        dispatch(setSchedules(scheduleData));

        setTimeout(() => {
          navigator("/trips");
        }, 3000);
      })
      .catch((error) => {
        console.error("Error while creating trip", error.response);
        if ((error as any).response?.data?.message) {
          toast.error((error as any).response.data.message, {
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
      });
  };

  return (
    <Card>
      <MDBox p={3}>
        <MDBox mt={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormField
                type="text"
                label="Pick up"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setFrom(e.target.value)}
                defaultValue={from}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField
                type="text"
                label="Drop off"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setTo(e.target.value)}
                defaultValue={to}
              />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mt={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3}>
              <FormField
                type="number"
                label="Fare amount in $"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setFareAmount(e.target.value)}
                defaultValue={fareAmount}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormField
                type="number"
                label="Number of sits"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSits(e.target.value)}
                defaultValue={sits}
              />
            </Grid>
            <MDBox mb={3} ml={2}>
              <MDBox mb={1} mt={2} display="flex" flexDirection="column">
                <MDTypography
                  component="label"
                  variant="button"
                  fontWeight="regular"
                  color="text"
                  textTransform="capitalize"
                >
                  Leaving
                </MDTypography>
              </MDBox>
              <MDBox mb={1.625} display="inline-block">
                <DatePicker
                  dateFormat="yyyy/MM/dd"
                  selected={startDate}
                  onChange={selectDateHandler}
                  minDate={today}
                  todayButton={"Today"}
                />
              </MDBox>
            </MDBox>
          </Grid>
        </MDBox>
        <MDBox mt={1}>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <MDBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                <MDTypography component="label" variant="button" fontWeight="regular" color="text">
                  Description&nbsp;&nbsp;
                  <MDTypography variant="caption" fontWeight="regular" color="text">
                    (optional)
                  </MDTypography>
                </MDTypography>
              </MDBox>
              <FormField
                type="text"
                label=""
                onChange={(e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
                defaultValue={description}
              />
              <MDBox display="flex" justifyContent="flex-start" mt={2}>
                <MDButton variant="gradient" color="info" onClick={onCreatePressed}>
                  save
                </MDButton>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default ProductInfo;
