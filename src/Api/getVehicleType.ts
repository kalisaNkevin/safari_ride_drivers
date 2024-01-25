import apiUrlV1 from "utils/axiosInstance";

const getVehicleTypes = () => {
  const token = localStorage.getItem("accessToken");
  return new Promise((resolve, reject) => {
    apiUrlV1
      .get("/admin/vehicles/types", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        resolve(response.data.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default getVehicleTypes;
