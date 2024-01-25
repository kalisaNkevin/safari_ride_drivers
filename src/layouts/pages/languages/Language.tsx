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
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { RootStateLang } from "redux/store";
import { CircularProgress } from "@mui/material";
import apiUrlV1 from "utils/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import getLanguages from "Api/getLanguages";
import {
  deleteLanguage,
  setLanguages,
  updateLanguage,
} from "redux/features/languages/languagesSlice";

function Language(): JSX.Element {
  // Get id from url
  const { id } = useParams<{ id: string }>();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const languages = useSelector((state: RootStateLang) => state.languages.results);
  const [filteredLanguage, setFilteredLanguage] = useState([]);

  // Inputs State
  const [getLangName, SetLangName] = useState<string>();

  const token = localStorage.getItem("accessToken");
  const handleDeleteBtn = () => {
    apiUrlV1
      .delete(`/admin/languages/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        navigate("/languages");
        dispatch(deleteLanguage(parseInt(id)));
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
        toast.error("Failed to delete vehicle type, try again", {
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
    SetLangName(e.target.value);
  };

  const handleUpdateLanguage = (e: any) => {
    e.preventDefault();

    apiUrlV1
      .patch(
        `/admin/languages/${id}`,
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
        const data = response.data["data"][1];
        if (data) {
          const newLanguage = {
            id: data.id,
            name: data.name,
            active: data.active,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
          };

          dispatch(updateLanguage(newLanguage));
          toast.success("Language updated successfully", {
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
        toast.error("Error updating a language", {
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const langs = await getLanguages();
        dispatch(setLanguages(langs));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (languages.length === 0) {
      fetchData();
    } else {
      const vType = languages.filter((type) => type.id === parseInt(id, 10));
      if (vType.length != 0) {
        setFilteredLanguage(vType);
        SetLangName(vType[0].name);
      }
      setIsLoading(false);
    }
  }, [dispatch, id, languages]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={4}>
        <Grid container spacing={3}>
          {!isLoading ? (
            <>
              <Grid item xs={12} lg={9} sx={{ mx: "auto" }}>
                <Card sx={{ overflow: "visible" }}>
                  <MDBox px={3} py={5}>
                    <MDBox component="form" role="form" onSubmit={handleUpdateLanguage}>
                      <MDBox mb={3} sx={{ display: "flex", justifyContent: "space-between" }}>
                        <MDBox>
                          <MDTypography variant="h5" fontWeight="medium">
                            Edit Language
                          </MDTypography>
                        </MDBox>
                        <MDBox>
                          <MDButton variant="gradient" type="submit" color="dark" fullWidth>
                            Update
                          </MDButton>
                        </MDBox>
                      </MDBox>
                      <MDBox mb={2}>
                        <MDInput
                          type="text"
                          label="Language"
                          name="name"
                          value={getLangName}
                          onChange={handleChangeLang}
                          fullWidth
                        />
                      </MDBox>
                    </MDBox>
                  </MDBox>
                </Card>
              </Grid>
              <Grid item xs={12} lg={9} sx={{ mx: "auto" }}>
                <MDBox mb={3}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Card id="languageTypeDelete">
                        <MDBox
                          pr={3}
                          display="flex"
                          justifyContent="space-between"
                          alignItems={{ xs: "flex-start", sm: "center" }}
                          flexDirection={{ xs: "column", sm: "row" }}
                        >
                          <MDBox p={3} lineHeight={1}>
                            <MDBox mb={1}>
                              <MDTypography variant="h5">Delete Language</MDTypography>
                            </MDBox>
                            <MDTypography variant="button" color="text">
                              Once you delete this language, there is no going back. Please be
                              certain.
                            </MDTypography>
                          </MDBox>
                          <MDBox display="flex" flexDirection={{ xs: "column", sm: "row" }}>
                            <MDBox ml={{ xs: 0, sm: 1 }} mt={{ xs: 1, sm: 0 }}>
                              <MDButton
                                variant="gradient"
                                color="error"
                                sx={{ height: "100%" }}
                                onClick={handleDeleteBtn}
                              >
                                delete language
                              </MDButton>
                            </MDBox>
                          </MDBox>
                        </MDBox>
                      </Card>
                    </Grid>
                  </Grid>
                </MDBox>
              </Grid>
            </>
          ) : (
            <Grid item xs={12} lg={9} mb={4} sx={{ mx: "auto" }}>
              <Card id="loading">
                <MDBox sx={{ position: "relative", mx: "auto", width: 100, p: 13.5 }}>
                  <CircularProgress />
                </MDBox>
              </Card>
            </Grid>
          )}
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Language;
