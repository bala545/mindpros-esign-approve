import React, { useCallback, useMemo, useState, useRef,useEffect } from 'react';
import Grid from "@mui/material/Grid";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Card from "@mui/material/Card";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import approvalData from "layouts/user-management/approvalData";
import stepsData from "layouts/user-management/stepsData";
import DataTable from "examples/Tables/DataTable";
import MDTypography from "components/MDTypography";
import { useLocation } from 'react-router-dom';
import { Button } from '@mui/base/Button';
import { useTheme } from '@mui/material/styles';
import DrawIcon from '@mui/icons-material/Draw';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import ApproveRejectDialog from '../../layouts/billing/components/ApproveReject';
import MDAlert from "components/MDAlert";

function Billing() {
  const location = useLocation();
  const { rowData } = location.state || {};
  console.log(rowData);
  const [openApprove, setOpenApprove] = useState(false);
  const [openReject, setOpenReject] = useState(false);
  const [isApproved,setIsApproved] = useState(false);
  const [isRejected,setIsRejected] = useState(false);
  const [hideActionColumn, setHideActionColumn] = useState(false);

  const handleOpenApprove = () => {
    setOpenApprove(true);
    setIsApproved(false);
    handleSave();
  };
  
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const handleSave = async () => {
      const data = {
        Record_ID: "0553b4af-aebb-45cf-9b34-2beaf9fc9ee3",
        Record_Type: "MindPros_esign",
        Record_Name: 'Test1',
        Approval_Task: "minf",
        Status: 'Completed',
        Reviewer: 'Bala',
        Updated_Date: new Date()
      };
  
      try {
        const res = await fetch('http://localhost:3000/saveapprovalqueue', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
  
        if (res.ok) {
          const result = await res.json();
          setResponse(result);
        } else {
          throw new Error('Failed to save data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    // const callApi = async () => {
    //   try {
    //     const res = await fetch('http://localhost:3000/saveapprovalqueue',{
    //       method: 'POST',
    //       headers: {
    //         'content-type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         Record_ID: "New",
    //         Record_Type: "MindPros_esign",
    //         Record_Name: 'Test',
    //         Approval_Task: "minf",
    //         Status: 'Completed',
    //         Reviewer: 'Bala',
    //         Updated_Date: ''
    //       }),
    //     });
    //     if (!res.ok) {
    //       throw new Error(`Error: ${res.status} ${res.statusText}`);
    //     }
    //     const data = await res.json();
    //     setResponse(data);
    //   } catch (error) {
    //     setError(error.message);
    //   }
    // }

  const handleCloseApprove = () => {
    setOpenApprove(false);
    setIsApproved(true);
    setHideActionColumn(true);
  };

  const handleOpenReject = () => {
    setOpenReject(true);
    setIsRejected(false);
  };

  const handleCloseReject = () => {
    setOpenReject(false);
    setIsRejected(true);
    setHideActionColumn(true);
  };
  const mindprosDetails = [
    { label: "System", value: rowData?.System },
    { label: "Item Type", value: "Bug" },
    { label: "Record ID", value: rowData?.RecordId },
    { label: "Record Type", value: rowData?.["Record Type"] ?? "" }, 
    { label: "Revision", value: 1 },
    { label: "Record Status", value: "Pending" },
    { label: "Domain Name", value: rowData?.Domain }
  ];
  const qTestDetails = [
    { label: "Status", value: "New" },
    { label: "Type", value: "Manual" },
    { label: "GxP", value: "Y" },
    { label: "Category", value: "PQ" },
    { label: "qTest Version ID", value: "60773587" },
    { label: "Project ID", value: "115898" }
  ];

    // const [events, setEvents] = useState({
    //   approvalQueueClicked: false,
    //   // Add other events as needed
    // });
  
    // // Simulate event triggering (replace with actual event logic)
    // useEffect(() => {
    //     setEvents((prevEvents) => ({
    //       ...prevEvents,
    //       approvalQueueClicked: true,
    //     }));
    // }, []);

    const theme = useTheme();
  const handleAttachmentClick = () => {

    // Create a hidden file input element
    const input = document.createElement("input");
    input.type = "file";
    input.style.display = "none";
    input.onchange = (event) => {
      const file = event.target.files[0];
      console.log("Selected file:", file);
      // Handle file selection (e.g., upload the file or process it)
    };
    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
  };

  const { columns: approvalColumns, rows: approvalRows } = approvalData(handleOpenApprove, handleOpenReject, hideActionColumn);
  const { columns: stepsColumns, rows: stepsRows } = stepsData();

  return (
    <DashboardLayout>
 
      <DashboardNavbar absolute isMini />

      <MDBox pt={10} pb={3}>
        <MDBox pt={0} pb={3}>
          {isApproved && (
            <MDAlert color="success" dismissible sx={{ maxWidth: "124rem", marginLeft: "2rem" }}>
              <MDTypography variant="body2" color="white" fontWeight="medium">
                Approved
              </MDTypography>
            </MDAlert>
          )}
          {isRejected && (
            <MDAlert color="error" dismissible sx={{ maxWidth: "124rem", marginLeft: "2rem" }}>
              <MDTypography variant="body2" color="white" fontWeight="medium">
                Rejected
              </MDTypography>
            </MDAlert>
          )}
        </MDBox>

        <Grid container spacing={6}>
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
                  Details
                </Typography>
              </MDBox>
              <MDBox pt={3}>
                <MDBox p={7}>
                  <Accordion defaultExpanded>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="vera-details-content"
                      id="vera-details-header"
                    >
                      <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize"> MindPROS Details</MDTypography>
                    </AccordionSummary>
                    <>
                      <AccordionDetails>
                        <Grid container spacing={1}>
                          {mindprosDetails.map((item, index) => (
                            <Grid item xs={12} sm={4} key={index}>
                              <MDBox display="flex">
                                <MDTypography
                                  variant="button"
                                  fontWeight="bold"
                                  textTransform="capitalize"
                                  style={{ marginRight: '0.5rem' }}
                                >
                                  {item.label}:
                                </MDTypography>
                                <MDTypography variant="button" fontWeight="regular" color="text">
                                  {item.value}
                                </MDTypography>
                              </MDBox>
                            </Grid>
                          ))}
                        </Grid>
                      </AccordionDetails>
                    </>

                  </Accordion>

                  <Accordion defaultExpanded>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="qtest-details-content"
                      id="qtest-details-header"
                    >
                      <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize"> qTest Details</MDTypography>
                    </AccordionSummary>
                    <>
                      <AccordionDetails>
                        <Grid container spacing={1}>
                          {qTestDetails.map((item, index) => (
                            <Grid item xs={12} sm={4} key={index}>
                              <MDBox display="flex">
                                <MDTypography
                                  variant="button"
                                  fontWeight="bold"
                                  textTransform="capitalize"
                                  style={{ marginRight: '0.5rem' }}
                                >
                                  {item.label}:
                                </MDTypography>
                                <MDTypography variant="button" fontWeight="regular" color="text">
                                  {item.value}
                                </MDTypography>
                              </MDBox>
                            </Grid>
                          ))}
                        </Grid>
                      </AccordionDetails>
                      <Accordion defaultExpanded>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="qtest-steps-content"
                          id="qtest-steps-header"
                        >
                          <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize"> Steps</MDTypography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <MDBox>
                            <Grid container spacing={6}>
                              <Grid item xs={12}>
                                <Card>
                                  <MDBox pt={1}>
                                    <DataTable
                                      table={{ columns: stepsColumns, rows: stepsRows }}
                                      isSorted={false}
                                      entriesPerPage={false}
                                      showTotalEntries={false}
                                      noEndBorder
                                    />
                                  </MDBox>
                                </Card>
                              </Grid>
                            </Grid>
                          </MDBox>
                        </AccordionDetails>
                      </Accordion>
                    </>

                  </Accordion>

                  <Accordion defaultExpanded>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="approval-route-content"
                      id="approval-route-header"
                    >
                      <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize"> Approval Route</MDTypography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing={1}>

                        <MDBox display="flex" style={{ marginLeft: '10px' }}>
                          <MDTypography
                            variant="button"
                            fontWeight="bold"
                            textTransform="capitalize"
                            style={{ marginRight: '0.5rem' }}
                          >
                            Status :
                          </MDTypography>
                          <MDTypography variant="button" fontWeight="regular" color="text">
                            in progress
                          </MDTypography>
                        </MDBox>
                      </Grid>
                      <Accordion defaultExpanded>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="qtest-steps-content"
                          id="qtest-steps-header"
                        >
                          <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize"> Level1</MDTypography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <MDBox pt={1} pb={1}>
                            <Grid container spacing={6}>
                              <Grid item xs={12}>
                                <Card>
                                  <MDBox>
                                    <DataTable
                                      table={{ columns: approvalColumns, rows: approvalRows }}
                                      isSorted={false}
                                      entriesPerPage={false}
                                      showTotalEntries={false}
                                      noEndBorder
                                    />
                                  </MDBox>
                                </Card>
                              </Grid>
                            </Grid>
                          </MDBox>
                        </AccordionDetails>
                      </Accordion>
                    </AccordionDetails>
                  </Accordion>
                </MDBox>
              </MDBox>
            </Card>
            <MDBox
  sx={{
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1000,
  }}
>
  <MDTypography variant="h6" color="textPrimary" sx={{ fontSize: '19px',paddingLeft:'20rem' }}>
    Argus System Owner Approval
  </MDTypography>
  <MDBox className="col-sm-3 p-2 approve-footer-buttons" sx={{ display: 'flex' }}>
  <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          style={{ border: "1px solid lightgray", borderRadius: "12px",marginRight:"0.3rem" }}
          onClick={handleOpenApprove}
        >
          <DrawIcon sx={{ color:'green' }}/> <Typography variant="button" sx={{ marginLeft: '8px',color:'green' }}>
      Approve
    </Typography>
        </IconButton>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          style={{ border: "1px solid lightgray", borderRadius: "12px" }}
          onClick={handleOpenReject}
        >
          <CancelIcon sx={{ color:'red' }}/> <Typography variant="button" sx={{ marginLeft: '8px',color:'red' }}>
      Reject
    </Typography>
        </IconButton>
  </MDBox>
</MDBox>

          </Grid>
        </Grid>
      </MDBox>
      <Footer />
      <ApproveRejectDialog
        openApprove={openApprove}
        openReject={openReject}
        handleCloseApprove={handleCloseApprove}
        handleCloseReject={handleCloseReject}
      />
    </DashboardLayout>
  );
}

export default Billing;
