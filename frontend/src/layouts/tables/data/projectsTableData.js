
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";
import React from 'react';
export default function data() {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleApprove = () => {
    console.log('Approved');
    handleClose();
  };

  const handleReject = () => {
    console.log('Rejected');
    handleClose();
  };

  const status = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" variant="rounded" />
      <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  const Actions = () => (
    <div>
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
      <MDButton style={{ backgroundColor: '#39c939', color: 'white' }}>Approve</MDButton>
          <MDButton style={{ backgroundColor: '#bd180c', color: 'white' }}>Reject</MDButton>
          </ButtonGroup>
    </div>
  );

  const Progress = ({ color, value }) => (
    <MDBox display="flex" alignItems="center">
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {value}%
      </MDTypography>
      <MDBox ml={0.5} width="9rem">
        <MDProgress variant="gradient" color={color} value={value} />
      </MDBox>
    </MDBox>
  );

  return {
    columns: [
      { Header: "route", accessor: "route", width: "30%", align: "left" },
      { Header: "status", accessor: "status", width: "30%", align: "left" },
      { Header: "owner", accessor: "owner", align: "left" },
      { Header: "started", accessor: "started", align: "left" },
      { Header: "ended", accessor: "ended", align: "left" },
    ],

    rows: [
      {
        route: (<MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium"> Validation Test</MDTypography>),
        status:  (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
           MindPROS esign
          </MDTypography>
        ),
        owner: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
            JIRA
          </MDTypography>
        ),
        started: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
           Jira Story
          </MDTypography>
        ),
        ended: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
            Vera-1 - Test for validation
          </MDTypography>
        )
      },
      {
        route: (<MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium"> Validation Test</MDTypography>),
        status:  (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
           MindPROS esign
          </MDTypography>
        ),
        owner: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
            JIRA
          </MDTypography>
        ),
        started: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
           Jira Story
          </MDTypography>
        ),
        ended: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
            Vera-1 - Test for validation
          </MDTypography>
        )
      },
      {
        route: (<MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium"> Validation Test</MDTypography>),
        status:  (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
           MindPROS esign
          </MDTypography>
        ),
        owner: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
            JIRA
          </MDTypography>
        ),
        started: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
           Jira Story
          </MDTypography>
        ),
        ended: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
            Vera-1 - Test for validation
          </MDTypography>
        )
      },
      {
        route: (<MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium"> Validation Test</MDTypography>),
        status:  (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
           MindPROS esign
          </MDTypography>
        ),
        owner: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
            JIRA
          </MDTypography>
        ),
        started: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
           Jira Story
          </MDTypography>
        ),
        ended: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
            Vera-1 - Test for validation
          </MDTypography>
        )
      },
      {
        route: (<MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium"> Validation Test</MDTypography>),
        status:  (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
           MindPROS esign
          </MDTypography>
        ),
        owner: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
            JIRA
          </MDTypography>
        ),
        started: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
           Jira Story
          </MDTypography>
        ),
        ended: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
            Vera-1 - Test for validation
          </MDTypography>
        )
      },
      {
        route: (<MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium"> Validation Test</MDTypography>),
        status:  (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
           MindPROS esign
          </MDTypography>
        ),
        owner: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
            JIRA
          </MDTypography>
        ),
        started: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
           Jira Story
          </MDTypography>
        ),
        ended: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
            Vera-1 - Test for validation
          </MDTypography>
        )
      },
    ],
  };
}
