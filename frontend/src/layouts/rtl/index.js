import { useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// MINDPROS React components
import MDBox from "components/MDBox";

// MINDPROS React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";



import reportsLineChartData from "layouts/rtl/data/reportsLineChartData";

// RTL components
import activityData from "layouts/user-management/activityData";

// MINDPROS React contexts
import { useMaterialUIController, setDirection } from "context";
import DataTable from "examples/Tables/DataTable";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

function RTL() {
  const [, dispatch] = useMaterialUIController();
  const { sales, tasks } = reportsLineChartData;
  const { columns: stepsColumns, rows: stepsRows } = activityData();
  // Changing the direction to rtl
  // useEffect(() => {
  //   setDirection(dispatch, "rtl");

  //   return () => setDirection(dispatch, "ltr");
  // }, []);

  return (
    <DashboardLayout>
    <DashboardNavbar absolute isMini />
    <MDBox pt={10} pb={3} >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <MDBox
              mx={2}
              mt={-3}
              py={3}
              px={2}
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
            >
              <Typography variant="h6" color="white">
                Activity History
              </Typography>
            </MDBox>
            <MDBox pt={3}>
              <MDBox px={2}>
          <Card>
            <MDBox pt={3}>
              <DataTable
                table={{ columns: stepsColumns, rows: stepsRows }}
                isSorted={false}
                entriesPerPage={false}
                showTotalEntries={false}
                noEndBorder
              />
            </MDBox>
          </Card>
        </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default RTL;
