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
import UserProfile from "./components/UserProfile/UserProfile";
import StatusActive from "./components/StatusActive/StatusActive";
import { useDispatch, useSelector } from "react-redux";
import { RootStateUsers } from "redux/store";
import { useEffect, useState } from "react";
import getUsers from "Api/getUsers";
import { setUsers } from "redux/features/users/usersSlice";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Import default user profile
import defaultImg from "assets/images/user/default.png";
import formatDate from "utils/DateFormat";

function Admin(): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const columns = [
    {
      Header: "Name",
      accessor: "name",
      Cell: ({ value: [name, phonenumber, data] }: any) => (
        <UserProfile
          image={data.image != null ? data.image : defaultImg}
          name={name}
          phonenumber={phonenumber}
        />
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
  ];

  const dispatch = useDispatch();
  const navigator = useNavigate();
  const users = useSelector((state: RootStateUsers) => state.users.results);

  const GetAllUserDetails = (userId: number): void => {
    navigator(`/user/${userId}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUsers();
        dispatch(setUsers(userData));
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (users.length === 0) {
      fetchData();
    } else {
      setIsLoading(false);
    }
  }, [dispatch, users]);

  const rows = users
    .filter((user) => user.userType.id == 3)
    .map((user) => ({
      name: [user.fullName, user.phoneNumber, { image: user.profileImage }],
      gender: user.gender == null ? "_" : user.gender,
      email: user.email == null ? "_" : user.email,
      regdate: formatDate(user.createdAt),
      status: user.isVerified ? "Active" : "Inactive",
      action: (
        <MDButton
          variant="outlined"
          color="info"
          size="small"
          onClick={() => GetAllUserDetails(user.id)}
        >
          View
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

export default Admin;
