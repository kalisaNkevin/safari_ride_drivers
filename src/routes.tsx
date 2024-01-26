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

/** 
  All of the routes for the Material Dashboard 2 PRO React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that contains other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 PRO React layouts
import Basic from "layouts/authentication/sign-in";

// Material Dashboard 2 PRO React TS components
import MDAvatar from "components/MDAvatar";

// @mui icons
import Icon from "@mui/material/Icon";

// Images
import Admin from "layouts/pages/users/admin";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import VehicleTypes from "layouts/pages/vehicles/types";
import VehicleType from "layouts/pages/vehicles/type";
import Schedules from "layouts/pages/users/schedules";
import Documents from "layouts/pages/users/ViewDocuments";
import ViewUser from "layouts/pages/users/ViewUser";
import ViewSchedule from "layouts/pages/users/ViewSchedule";
import ResetPassword from "layouts/authentication/reset-password/cover";
import Notifications from "layouts/pages/notifications";
import DRequest from "layouts/pages/driverRequest/DRequest";

const routes = () => {
  const { user } = useSelector<RootState, any>((state) => state.auth);
  return [
    {
      type: "collapse",
      name: `${user?.fullName}`,
      key: `${user?.fullName}`,
      icon: <MDAvatar src={user?.profileImage} alt={`${user?.fullName}`} size="sm" />,
      collapse: [
        {
          name: "Logout",
          key: "logout",
          route: "/login",
          component: <Basic />,
        },
      ],
    },
    { type: "title", title: "Pages", key: "title-pages" },
    {
      type: "collapse",
      name: "Pages",
      key: "pages",
      icon: <Icon fontSize="medium">image</Icon>,
      collapse: [
        {
          protected: true,
          name: "My profile",
          key: "admin",
          route: "/admins",
          component: <Admin />,
        },
        {
          protected: true,
          name: "Driver documents",
          key: "documents",
          route: "/documents",
          component: <Documents />,
        },
        {
          protected: true,
          name: "My trips",
          key: "trips",
          route: "/trips",
          component: <Schedules />,
        },
        {
          protected: true,
          name: "My vehicle",
          key: "vehicle",
          route: "/vehicle/types",
          component: <VehicleTypes />,
        },
      ],
    },

    // Hiden routes
    {
      display: false,
      protected: true,
      name: "Driver",
      key: "Driver",
      route: "/user/:id",
      component: <ViewUser />,
    },
    {
      display: false,
      protected: true,
      name: "Schedules",
      key: "Schedules",
      route: "/schedule/:id",
      component: <ViewSchedule />,
    },
    {
      display: false,
      protected: true,
      name: "vehicleType",
      key: "vehicleType",
      route: "/vehicle/types/:id",
      component: <VehicleType />,
    },
    {
      display: false,
      protected: true,
      name: "DRequest",
      key: "DRequest",
      route: "/driver-request/:id",
      component: <DRequest />,
    },
    {
      display: false,
      protected: true,
      name: "ResetPassword",
      key: "ResetPassword",
      route: "/reset-password",
      component: <ResetPassword />,
    },
    {
      display: false,
      protected: true,
      name: "notification",
      key: "notification",
      route: "/notifications",
      component: <Notifications />,
    },
  ];
};

export default routes;
