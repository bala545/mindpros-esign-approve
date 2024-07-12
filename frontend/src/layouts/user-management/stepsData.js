
import React, { useState, useEffect } from 'react';  
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import details  from '../../assets/api/details.json';

export default function stepsData() {

  const [stepData, setStepData] = useState(null);

  useEffect(() => {
    // Since we're importing the JSON directly, we can set it directly
    setStepData(details);
  }, []);
  const name = stepData?.record?.sub_records[0]?.name;
  const desc = stepData?.record?.sub_records[0]?.fields[0]?.value;
  const exp = stepData?.record?.sub_records[0]?.fields[1]?.value;
const descValue = desc?.replace(/<p>/g, '').replace(/<\/p>/g, '');
const expValue = exp?.replace(/<p>/g, '').replace(/<\/p>/g, '');
  
console.log(stepData);
  const Author = ({ image, name, expectedresult }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {stepData.record.sub_records[0].name}
        </MDTypography>
        <MDTypography variant="caption">{expectedresult}</MDTypography>
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
      { Header: "Step", accessor: "step", width: "45%", align: "left" },
      { Header: "Description", accessor: "description", align: "left" },
      { Header: "Expected Result", accessor: "expectedresult", align: "left" },
      // { Header: "", accessor: "action", align: "center" },
    ],

    rows: [
      {
        step:(
          <MDTypography variant="caption" color="text" fontWeight="medium">
              {name}
          </MDTypography>
        ),
        description: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
              {descValue}
          </MDTypography>
        ),
        expectedresult: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {expValue}
          </MDTypography>
        ),
        // action: (
        //     <MDBox>
        //         <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium" mr={2}>
        //         Approve
        //         </MDTypography>
        //         <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        //         Reject
        //         </MDTypography>
        //     </MDBox>
        // ),
      }
    ],
  };
}
