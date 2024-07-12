
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

export default function activityData() {
  const Author = ({ image, name, user }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{user}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "Date", accessor: "date", align: "center" },
      { Header: "Activity", accessor: "activity", align: "left" },
      { Header: "User", accessor: "user", align: "center" },
    ],

    rows: [
      {
        date: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            23/04/18
          </MDTypography>
        ),
        activity: <Job title="Admin" description="" />,
        user: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            admin@material.com
          </MDTypography>
        ),
    

      },
      {
        activity: <Job title="Creator" description="" />,
        user: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            creator@material.com
          </MDTypography>
        ),
        date: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            11/01/19
          </MDTypography>
        )
      },
      {
        activity: <Job title="Member" description="" />,
        user: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            member@material.com
          </MDTypography>
        ),
        date: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            19/09/17
          </MDTypography>
        )
      },
    ],
  };
}
