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
import axios from 'axios';

export default function approvalData(handleOpenApprove, handleOpenReject, hideActionColumn, rowData) {
  const [approveData, setApproveData] = useState([]); // Initialize as an empty array to avoid undefined issues

  // Fetch approval data
  const fetchApprovalData = async (recordId) => {
    try {
      let url = 'http://localhost:3000/getapprovalqueue';
  
      // If recordId is provided, append it as a query parameter
      if (recordId) {
        url += `?Record_ID=${recordId}`;
      }
  
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!res.ok) {
        throw new Error('Failed to fetch approval data');
      }
  
      const data = await res.json();
      setApproveData(data); // Update approveData with fetched data
      console.log('Fetched data:', data);
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchApprovalData(rowData?.Record_ID);
  }, [rowData?.Record_ID]); // Ensure the effect runs when Record_ID changes

  // Safeguard in case approveData is still loading or empty
  if (!approveData || approveData.length === 0) {
    return {
      columns: [],
      rows: [],
    };
  }

  const removeTags = (text) => {
    if (!text) return text;
    return text.replace(/<p>/g, '').replace(/<\/p>/g, '');
  };

  return {
    columns: [
      { Header: "Approval Task", accessor: "approvaltask", width: "45%", align: "left" },
      { Header: "Status", accessor: "status", align: "left" },
      { Header: "Reviewer", accessor: "reviewer", align: "left" },
      { Header: "Date", accessor: "date", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: approveData.map((taskOne, index) => ({
      approvaltask: (
        <MDTypography key={`task-${index}`} variant="caption" color="text" fontWeight="medium">
          {removeTags(taskOne?.Approval_Task)}
        </MDTypography>
      ),
      status: (
        <MDTypography key={`status-${index}`} variant="caption" color="text" fontWeight="medium">
          {taskOne?.Status}
        </MDTypography>
      ),
      reviewer: (
        <MDTypography key={`reviewer-${index}`} variant="caption" color="text" fontWeight="medium">
          {taskOne?.Reviewer}
        </MDTypography>
      ),
      date: (
        <MDTypography key={`date-${index}`} variant="caption" color="text" fontWeight="medium">
          {new Date(taskOne?.Updated_Date).toLocaleDateString()} {/* Format date */}
        </MDTypography>
      ),
      action:index == 0 && taskOne?.Status === "Pending" && !hideActionColumn && (
        <MDBox key={`action-${index}`}>
          <IconButton
            size="large"
            aria-label="approve"
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
      ),
    })),
  };
}

