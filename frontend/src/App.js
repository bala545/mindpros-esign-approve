import React, { useState, useEffect, useContext } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";
import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import routes from "routes";
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";
import { setupAxiosInterceptors } from "./services/interceptor";
import ProtectedRoute from "examples/ProtectedRoute";
import { AuthContext } from "context";
import { Helmet } from "react-helmet";
import 'bootstrap/dist/css/bootstrap.min.css';

// Importing necessary components
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Grids from "layouts/grid"; // Ensure Grids is imported here
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import UserProfile from "layouts/user-profile";
import UserManagement from "layouts/user-management";
import Login from "auth/login";
import Register from "auth/register";
import ForgotPassword from "auth/forgot-password";
import ResetPassword from "auth/reset-password";
import { useEvent } from "./useEvent";


export default function App() {
  const authContext = useContext(AuthContext);
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();


  // const { events } = useEvent(); 
  const [approvalQueueClicked, setApprovalQueueClicked] = useState(false);

  const appAQ = () => {
    setApprovalQueueClicked(true);
  };
  const appAQHide = () => {
    setApprovalQueueClicked(false);
  };

  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  setupAxiosInterceptors(() => {
    navigate("/dashboard");
  });

  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route && route.type !== "auth") {
        return (
          <Route
            exact
            path={route.route}
            element={
              <ProtectedRoute isAuthenticated={authContext.isAuthenticated}>
                {route.component}
              </ProtectedRoute>
            }
            key={route.key}
          />
        );
      }
      return null;
    });

  const dynamicRoutes = [
    approvalQueueClicked && {
      type: "collapse",
      name: "Approval Routes",
      key: "tables",
      icon: <Icon fontSize="small">table_view</Icon>,
      route: "/tables",
      component: <Tables />,
    },
    approvalQueueClicked && {
      type: "collapse",
      name: "Details",
      key: "billing",
      icon: <Icon fontSize="small">receipt_long</Icon>,
      route: "/billing",
      component: <Billing />,
    },
    approvalQueueClicked && {
      type: "collapse",
      name: "Activity History",
      key: "rtl",
      icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
      route: "/rtl",
      component: <RTL />,
    },
    approvalQueueClicked && {
      type: "collapse",
      name: "Notifications",
      key: "notifications",
      icon: <Icon fontSize="small">notifications</Icon>,
      route: "/notifications",
      component: <Notifications />,
    },
    {
      type: "collapse",
      name: "Profile",
      key: "profile",
      icon: <Icon fontSize="small">person</Icon>,
      route: "/profile",
      component: <Profile />,
    },
    {
      type: "examples",
      name: "User Profile",
      key: "user-profile",
      icon: <Icon fontSize="small">person</Icon>,
      route: "/user-profile",
      component: <UserProfile />,
    },
    {
      type: "examples",
      name: "User Management",
      key: "user-management",
      icon: <Icon fontSize="small">list</Icon>,
      route: "/user-management",
      component: <UserManagement />,
    },
  ].filter(Boolean);

  const initialRoutes = [
    {
      type: "collapse",
      name: "Dashboard",
      key: "dashboard",
      icon: <Icon fontSize="small">dashboard</Icon>,
      route: "/dashboard",
      component: <Dashboard onLoad={appAQHide}/>,
    },
    {
      type: "collapse",
      name: "Approval Queue",
      key: "grids",
      icon: <Icon fontSize="small">table_view</Icon>,
      route: "/grids",
      component: <Grids onLoad={appAQHide} appAQ={appAQ} />,
    },
  ];

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  return (
    <>
      {direction === "rtl" ? (
        <CacheProvider>
          <ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}>
            <CssBaseline />
            {layout === "dashboard" && (
              <>
                <Sidenav
                  color={sidenavColor}
                  brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
                  brandName="Material Dashboard 2"
                  routes={[...initialRoutes, ...dynamicRoutes]}
                  onMouseEnter={handleOnMouseEnter}
                  onMouseLeave={handleOnMouseLeave}
                />
                <Configurator />
                {configsButton}
              </>
            )}
            {layout === "vr" && <Configurator />}
            <Routes>
              {getRoutes(initialRoutes)}
              {getRoutes(dynamicRoutes)}
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </ThemeProvider>
        </CacheProvider>
      ) : (
        <ThemeProvider theme={darkMode ? themeDark : theme}>
          <CssBaseline />
          {layout === "dashboard" && (
            <>
              <Sidenav
                color={sidenavColor}
                brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
                brandName="eSign"
                routes={[...initialRoutes, ...dynamicRoutes]}
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
              />
              <Configurator />
              {configsButton}
            </>
          )}
          {layout === "vr" && <Configurator />}
          <Routes>
            {getRoutes(initialRoutes)}
            {getRoutes(dynamicRoutes)}
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </ThemeProvider>
      )}
    </>
  );
}
