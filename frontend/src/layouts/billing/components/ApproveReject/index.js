import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, useMediaQuery, useTheme } from '@mui/material';

const ApproveRejectDialog = ({ openApprove, openReject, handleCloseApprove, handleCloseReject, rowData  }) => {
  const [rejectReason, setRejectReason] = useState('');

  const handleRejectReasonChange = (event) => {
    setRejectReason(event.target.value);
  };

  const handleRejectSubmit = () => {
    console.log(`Rejected with reason: ${rejectReason}`);
    handleCloseReject();  // Close the Reject dialog after submission
  };

  // Log to debug if the function is called
  const handleApproveSubmit = () => {
    console.log("Approve Submit button clicked");
    handleSave();
    handleCloseApprove();
  };
  
  const handleSave = async () => {
    const data = {
      Record_ID: rowData.Record_ID,
      Record_Type: rowData.Record_Type,
      Record_Name: rowData.Record_Name,
      Approval_Task: rowData.Approval_Status,
      Status: 'Completed',
      Reviewer: rowData.Author,
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
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div>
      {/* Approve Dialog */}
      <Dialog
        open={openApprove}
        onClose={handleCloseApprove}  // Should close on backdrop click or Esc key
        fullScreen={fullScreen}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle style={{ color: 'linear-gradient(195deg, #49a3f1, #1A73E8)', borderBottom: '1px solid light gray' }}>
          Approve Selected Entity
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            I have reviewed the selected record and now apply my electronic signature with a meaning of Argus System Owner Approval.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="Username"
            type="email"
            fullWidth
            variant="standard"
            defaultValue="testteam@mind-pros.com"
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleApproveSubmit} style={{ color: 'linear-gradient(195deg, #49a3f1, #1A73E8)' }}>Submit</Button>
          <Button onClick={handleCloseApprove}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog
        open={openReject}
        onClose={handleCloseReject}
        fullScreen={fullScreen}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle style={{ color: 'linear-gradient(195deg, #49a3f1, #1A73E8)', borderBottom: '1px solid light gray' }}>
          Reject Selected Entity
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the rejection reason in the text box below:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="rejectionReason"
            label="Rejection reason..."
            type="text"
            fullWidth
            variant="standard"
            value={rejectReason}
            onChange={handleRejectReasonChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRejectSubmit} style={{ color: 'linear-gradient(195deg, #49a3f1, #1A73E8)' }}>Submit</Button>
          <Button onClick={handleCloseReject}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ApproveRejectDialog;
