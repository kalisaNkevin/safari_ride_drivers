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
import DataTable from "components/Tables/DataTable";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { RootStateLang } from "redux/store";
import { CircularProgress } from "@mui/material";
import apiUrlV1 from "utils/axiosInstance";

// React-toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getLanguages from "Api/getLanguages";
import { addLanguage, lang, setLanguages } from "redux/features/languages/languagesSlice";
import formatDate from "utils/DateFormat";

function Languages(): JSX.Element {
  const columns = [
    { Header: "id", accessor: "id", align: "center" },
    { Header: "Language", accessor: "name" },
    { Header: "Created At", accessor: "CreatedAt", align: "center" },
    { Header: "Action", accessor: "action" },
  ];

  const dispatch = useDispatch();
  const navigator = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const languages = useSelector((state: RootStateLang) => state.languages.results);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const langs = await getLanguages();
        dispatch(setLanguages(langs));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    if (languages.length === 0) {
      fetchData();
    } else {
      setIsLoading(false);
    }
  }, [dispatch, isLoading]);

  const rows = languages.map((lang) => ({
    id: lang.id,
    name: lang.name,
    CreatedAt: formatDate(lang.createdAt),
    action: (
      <MDButton
        variant="contained"
        color="dark"
        size="small"
        onClick={() => navigator(`/languages/${lang.id}`)}
      >
        More
      </MDButton>
    ),
  }));

  const [getLangName, setLangName] = useState<string>("");

  const handleSaveLanguage = (e: any) => {
    e.preventDefault();

    const token = localStorage.getItem("accessToken");
    apiUrlV1
      .post(
        "/admin/languages",
        {
          name: getLangName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        const data = response.data["data"];

        if (data) {
          const newLanguage = {
            id: data.id,
            name: data.name,
            active: data.active,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
          };

          dispatch(addLanguage(newLanguage));
          toast.success("New language added successfully", {
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
          console.error("Invalid API response format:", response);
          toast.error("Invalid API response format", {
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
        console.log(error.response);
        toast.error("Error adding new language", {
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

  const handleChangeLang = (e: ChangeEvent<HTMLInputElement>) => {
    setLangName(e.target.value);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox
        py={3}
        sx={{
          overflow: "visible",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "start",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} lg={3}>
            <Card sx={{ overflow: "visible" }}>
              <MDBox px={3} py={5}>
                <MDBox component="form" role="form" onSubmit={handleSaveLanguage}>
                  <MDBox mb={3} sx={{ display: "flex", justifyContent: "space-between" }}>
                    <MDBox>
                      <MDTypography variant="h5" fontWeight="medium">
                        New Language
                      </MDTypography>
                    </MDBox>
                    <MDBox>
                      <MDButton variant="gradient" type="submit" color="info" fullWidth>
                        Save
                      </MDButton>
                    </MDBox>
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Language"
                      name="name"
                      fullWidth
                      value={getLangName}
                      onChange={handleChangeLang}
                    />
                  </MDBox>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12} lg={9}>
            <MDBox mb={3}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Card sx={{ overflow: "visible" }}>
                    {!isLoading ? (
                      <MDBox p={3}>
                        <MDBox mt={8} mb={2}>
                          <MDBox mb={1} ml={2}>
                            <MDTypography variant="h5" fontWeight="medium">
                              Languages
                            </MDTypography>
                          </MDBox>
                          <DataTable
                            table={{ columns, rows }}
                            entriesPerPage={false}
                            showTotalEntries={false}
                            isSorted={true}
                          />
                        </MDBox>
                      </MDBox>
                    ) : (
                      <MDBox sx={{ position: "relative", mx: "auto", width: 100, p: 13.5 }}>
                        <CircularProgress />
                      </MDBox>
                    )}
                  </Card>
                </Grid>
              </Grid>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Languages;
