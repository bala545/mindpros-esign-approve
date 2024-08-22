import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";


// Images

import React, { useState, useEffect, useMemo } from 'react';  
import { Typography } from "@mui/material";
import { getDetails } from './detailsAQ';
import IconButton from '@mui/material/IconButton';
import DrawIcon from '@mui/icons-material/Draw';
import CancelIcon from '@mui/icons-material/Cancel';

export default function approvalData(handleOpenApprove, handleOpenReject, hideActionColumn) {
  const [approveData, setApproveData] = useState(null);
  const data = useMemo(() => getDetails(), []); 
  useEffect(() => {
    setApproveData(data);
  }, [data]);

  const taskOne = approveData?.route?.taskGroups[0]?.tasks[0];
  const taskTwo = approveData?.route?.taskGroups[0]?.tasks[1];
  const taskThree = approveData?.route?.taskGroups[0]?.tasks[2];
  const taskFour = approveData?.route?.taskGroups[0]?.tasks[3];

  
  const [isApproveorReject, setIsApproveorReject] = useState(false);
  const [isApproveorRejectOne, setIsApproveorRejectOne] = useState(false);
  const [isApproveorRejectt, setIsApproveorRejectt] = useState(false);
  const [isApproveorRejectf, setIsApproveorRejectf] = useState(false);


  const removeTags = (text) => {
    if (!text) return text;
    return text.replace(/<p>/g, '').replace(/<\/p>/g, '');
  };

  // const handleOpenApprove = () => {
    
  // };
  
  // const handleOpenReject = () => {
  //   // handle reject action
  // };

  const Author = ({ image, name, reviewer }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{reviewer}</MDTypography>
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

  const actions = ({}) => (
    <MDBox>
    <IconButton
    size="large"
    aria-label="approve"
    aria-controls="primary-search-account-menu"
    aria-haspopup="true"
    color="inherit"
    onClick={handleOpenApprove}
  >
    <DrawIcon sx={{ color: 'green' }} />
    <Typography variant="button" sx={{ marginLeft: '8px', color: 'green' }}>
      Approve
    </Typography>
  </IconButton>
  <IconButton
    size="large"
    aria-label="reject"
    aria-controls="primary-search-account-menu"
    aria-haspopup="true"
    color="inherit"
    style={{ borderRadius: "12px" }}
    onClick={handleOpenReject}
  >
    <CancelIcon sx={{ color: 'red' }} />
    <Typography variant="button" sx={{ marginLeft: '8px', color: 'red' }}>
      Reject
    </Typography>
  </IconButton>
  </MDBox>
  );

  return {
    columns: [
      { Header: "Approval Task", accessor: "approvaltask", width: "45%", align: "left" },
      { Header: "Status", accessor: "status", align: "left" },
      { Header: "Reviewer", accessor: "reviewer", align: "left" },
      { Header: "Date", accessor: "date", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: [
      {
        approvaltask: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {removeTags(taskOne?.meaning)}
          </MDTypography>
        ),
        status: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {taskOne?.status}
          </MDTypography>
        ),
        reviewer: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {taskOne?.role}
          </MDTypography>
        ),
        date: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {taskOne?.timestamp}
          </MDTypography>
        ),
        action:  !hideActionColumn && (
          <MDBox>
          <IconButton
          size="large"
          aria-label="approve"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          onClick={handleOpenApprove}
        >
          <DrawIcon sx={{ color: 'green' }} />
          <Typography variant="button" sx={{ marginLeft: '8px', color: 'green' }}>
            Approve
          </Typography>
        </IconButton>
        <IconButton
          size="large"
          aria-label="reject"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          style={{ borderRadius: "12px" }}
          onClick={handleOpenReject}
        >
          <CancelIcon sx={{ color: 'red' }} />
          <Typography variant="button" sx={{ marginLeft: '8px', color: 'red' }}>
            Reject
          </Typography>
        </IconButton>
        </MDBox>),
      },
      {
        approvaltask: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {removeTags(taskTwo?.meaning)}
          </MDTypography>
        ),
        status: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {taskTwo?.status}
          </MDTypography>
        ),
        reviewer: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {taskTwo?.reviewerName}
          </MDTypography>
        ),
        date: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {taskTwo?.timestamp}
          </MDTypography>
        ),
        action:  hideActionColumn && (
          <MDBox>
          <IconButton
          size="large"
          aria-label="approve"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          onClick={handleOpenApprove}
        >
          <DrawIcon sx={{ color: 'green' }} />
          <Typography variant="button" sx={{ marginLeft: '8px', color: 'green' }}>
            Approve
          </Typography>
        </IconButton>
        <IconButton
          size="large"
          aria-label="reject"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          style={{ borderRadius: "12px" }}
          onClick={handleOpenReject}
        >
          <CancelIcon sx={{ color: 'red' }} />
          <Typography variant="button" sx={{ marginLeft: '8px', color: 'red' }}>
            Reject
          </Typography>
        </IconButton>
        </MDBox>),
      },
      {
        approvaltask: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {removeTags(taskThree?.meaning)}
          </MDTypography>
        ),
        status: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {taskThree?.status}
          </MDTypography>
        ),
        reviewer: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {taskThree?.role}
          </MDTypography>
        ),
        date: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {taskThree?.timestamp}
          </MDTypography>
        ),
        action:   (
          isApproveorReject ?  (<MDBox>
          <IconButton
          size="large"
          aria-label="approve"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          onClick={handleOpenApprove}
        >
          <DrawIcon sx={{ color: 'green' }} />
          <Typography variant="button" sx={{ marginLeft: '8px', color: 'green' }}>
            Approve
          </Typography>
        </IconButton>
        <IconButton
          size="large"
          aria-label="reject"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          style={{ borderRadius: "12px" }}
          onClick={handleOpenReject}
        >
          <CancelIcon sx={{ color: 'red' }} />
          <Typography variant="button" sx={{ marginLeft: '8px', color: 'red' }}>
            Reject
          </Typography>
        </IconButton>
        </MDBox>):null),
      },
      {
        approvaltask: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {removeTags(taskFour?.meaning)}
          </MDTypography>
        ),
        status: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {taskFour?.status}
          </MDTypography>
        ),
        reviewer: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {taskFour?.role}
          </MDTypography>
        ),
        date: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {taskFour?.timestamp}
          </MDTypography>
        ),
        action: hideActionColumn && (
          <MDBox>
          <IconButton
          size="large"
          aria-label="approve"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          onClick={handleOpenApprove}
        >
          <DrawIcon sx={{ color: 'green' }} />
          <Typography variant="button" sx={{ marginLeft: '8px', color: 'green' }}>
            Approve
          </Typography>
        </IconButton>
        <IconButton
          size="large"
          aria-label="reject"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          style={{ borderRadius: "12px" }}
          onClick={handleOpenReject}
        >
          <CancelIcon sx={{ color: 'red' }} />
          <Typography variant="button" sx={{ marginLeft: '8px', color: 'red' }}>
            Reject
          </Typography>
        </IconButton>
        </MDBox>),
      },
    ],
  };
}
