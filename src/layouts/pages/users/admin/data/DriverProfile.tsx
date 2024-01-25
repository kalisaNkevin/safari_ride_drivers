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

// Images
import blackChair from "assets/images/ecommerce/black-chair.jpeg";
import UserProfile from "../components/UserProfile/UserProfile";
import StatusActive from "../components/StatusActive/StatusActive";
import MDButton from "components/MDButton";

const DriverProfile = {
  columns: [
    {
      Header: "Name",
      accessor: "name",
      Cell: ({ value: [name, phonenumber, data] }: any) => (
        <UserProfile image={data.image} name={name} phonenumber={phonenumber} />
      ),
    },
    { Header: "Gender", accessor: "gender" },
    { Header: "Email", accessor: "email" },
    { Header: "Registered date", accessor: "regdate" },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ value }: any) => {
        let status;

        if (value === "Active") {
          status = <StatusActive icon="done" color="success" status="Active" />;
        } else {
          status = <StatusActive icon="close" color="error" status="Inactive" />;
        }
        return status;
      },
    },
    { Header: "Action", accessor: "action" },
  ],

  rows: [
    {
      name: ["Mugisha abdoullatif", "+250789479289", { image: blackChair }],
      gender: "Male",
      email: "Adulaty@gmail.com",
      regdate: "01/01/2023",
      status: "Active",
      action: (
        <MDButton variant="outlined" color="info" size="small">
          View
        </MDButton>
      ),
    },
    {
      name: ["Mugisha abdoullatif", "+250789479289", { image: blackChair }],
      gender: "Male",
      email: "Adulaty@gmail.com",
      regdate: "01/01/2023",
      status: "Inactive",
      action: (
        <MDButton variant="outlined" color="info" size="small">
          View
        </MDButton>
      ),
    },
    {
      name: ["Mugisha abdoullatif", "+250789479289", { image: blackChair }],
      gender: "Male",
      email: "Adulaty@gmail.com",
      regdate: "01/01/2023",
      status: "Active",
      action: (
        <MDButton variant="outlined" color="info" size="small">
          View
        </MDButton>
      ),
    },
    {
      name: ["Mugisha abdoullatif", "+250789479289", { image: blackChair }],
      gender: "Male",
      email: "Adulaty@gmail.com",
      regdate: "01/01/2023",
      status: "Inactive",
      action: (
        <MDButton variant="outlined" color="info" size="small">
          View
        </MDButton>
      ),
    },
    {
      name: ["Mugisha abdoullatif", "+250789479289", { image: blackChair }],
      gender: "Male",
      email: "Adulaty@gmail.com",
      regdate: "01/01/2023",
      status: "Active",
      action: (
        <MDButton variant="outlined" color="info" size="small">
          View
        </MDButton>
      ),
    },
    {
      name: ["Mugisha abdoullatif", "+250789479289", { image: blackChair }],
      gender: "Male",
      email: "Adulaty@gmail.com",
      regdate: "01/01/2023",
      status: "Inactive",
      action: (
        <MDButton variant="outlined" color="info" size="small">
          View
        </MDButton>
      ),
    },
    {
      name: ["Mugisha abdoullatif", "+250789479289", { image: blackChair }],
      gender: "Male",
      email: "Adulaty@gmail.com",
      regdate: "01/01/2023",
      status: "Active",
      action: (
        <MDButton variant="outlined" color="info" size="small">
          View
        </MDButton>
      ),
    },
    {
      name: ["Mugisha abdoullatif", "+250789479289", { image: blackChair }],
      gender: "Male",
      email: "Adulaty@gmail.com",
      regdate: "01/01/2023",
      status: "Inactive",
      action: (
        <MDButton variant="outlined" color="info" size="small">
          View
        </MDButton>
      ),
    },
    {
      name: ["Mugisha abdoullatif", "+250789479289", { image: blackChair }],
      gender: "Male",
      email: "Adulaty@gmail.com",
      regdate: "01/01/2023",
      status: "Active",
      action: (
        <MDButton variant="outlined" color="info" size="small">
          View
        </MDButton>
      ),
    },
    {
      name: ["Mugisha abdoullatif", "+250789479289", { image: blackChair }],
      gender: "Male",
      email: "Adulaty@gmail.com",
      regdate: "01/01/2023",
      status: "Inactive",
      action: (
        <MDButton variant="outlined" color="info" size="small">
          View
        </MDButton>
      ),
    },
    {
      name: ["Mugisha abdoullatif", "+250789479289", { image: blackChair }],
      gender: "Male",
      email: "Adulaty@gmail.com",
      regdate: "01/01/2023",
      status: "Active",
      action: (
        <MDButton variant="outlined" color="info" size="small">
          View
        </MDButton>
      ),
    },
    {
      name: ["Mugisha abdoullatif", "+250789479289", { image: blackChair }],
      gender: "Male",
      email: "Adulaty@gmail.com",
      regdate: "01/01/2023",
      status: "Inactive",
      action: (
        <MDButton variant="outlined" color="info" size="small">
          View
        </MDButton>
      ),
    },
    {
      name: ["Mugisha abdoullatif", "+250789479289", { image: blackChair }],
      gender: "Male",
      email: "Adulaty@gmail.com",
      regdate: "01/01/2023",
      status: "Active",
      action: (
        <MDButton variant="outlined" color="info" size="small">
          View
        </MDButton>
      ),
    },
    {
      name: ["Mugisha abdoullatif", "+250789479289", { image: blackChair }],
      gender: "Male",
      email: "Adulaty@gmail.com",
      regdate: "01/01/2023",
      status: "Inactive",
      action: (
        <MDButton variant="outlined" color="info" size="small">
          View
        </MDButton>
      ),
    },
    {
      name: ["Mugisha abdoullatif", "+250789479289", { image: blackChair }],
      gender: "Male",
      email: "Adulaty@gmail.com",
      regdate: "01/01/2023",
      status: "Active",
      action: (
        <MDButton variant="outlined" color="info" size="small">
          View
        </MDButton>
      ),
    },
    {
      name: ["Mugisha abdoullatif", "+250789479289", { image: blackChair }],
      gender: "Male",
      email: "Adulaty@gmail.com",
      regdate: "01/01/2023",
      status: "Inactive",
      action: (
        <MDButton variant="outlined" color="info" size="small">
          View
        </MDButton>
      ),
    },
    {
      name: ["Mugisha abdoullatif", "+250789479289", { image: blackChair }],
      gender: "Male",
      email: "Adulaty@gmail.com",
      regdate: "01/01/2023",
      status: "Active",
      action: (
        <MDButton variant="outlined" color="info" size="small">
          View
        </MDButton>
      ),
    },
    {
      name: ["Mugisha abdoullatif", "+250789479289", { image: blackChair }],
      gender: "Male",
      email: "Adulaty@gmail.com",
      regdate: "01/01/2023",
      status: "Inactive",
      action: (
        <MDButton variant="outlined" color="info" size="small">
          View
        </MDButton>
      ),
    },
    {
      name: ["Mugisha abdoullatif", "+250789479289", { image: blackChair }],
      gender: "Male",
      email: "Adulaty@gmail.com",
      regdate: "01/01/2023",
      status: "Active",
      action: (
        <MDButton variant="outlined" color="info" size="small">
          View
        </MDButton>
      ),
    },
    {
      name: ["Mugisha abdoullatif", "+250789479289", { image: blackChair }],
      gender: "Male",
      email: "Adulaty@gmail.com",
      regdate: "01/01/2023",
      status: "Inactive",
      action: (
        <MDButton variant="outlined" color="info" size="small">
          View
        </MDButton>
      ),
    },
  ],
};

export default DriverProfile;
