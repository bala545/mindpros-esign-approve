import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';

const ApproveRejectDialog = ({ openApprove, openReject, handleCloseApprove, handleCloseReject }) => {
  const [rejectReason, setRejectReason] = useState('');

  const handleRejectReasonChange = (event) => {
    setRejectReason(event.target.value);
  };

  const handleRejectSubmit = () => {
    // window.alert(`Rejected with reason: ${rejectReason}`);
    // setOpenReject(false);
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div>
      <Dialog
        open={openApprove}
        onClose={handleCloseApprove}
        fullScreen={fullScreen}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle style={{ color: 'linear-gradient(195deg, #49a3f1, #1A73E8)', borderBottom: '1px solid light gray' }}>
          Approve Selected Entity
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            I have reviewed the selected record and now apply my electronic signature with a meaning of Argus System Owner Approval
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
          <Button onClick={handleCloseApprove} style={{ color: 'linear-gradient(195deg, #49a3f1, #1A73E8)' }}>Submit</Button>
          <Button onClick={handleCloseApprove}>Cancel</Button>
        </DialogActions>
      </Dialog>

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
          {/* <Button onClick={handleRejectSubmit} style={{ color: 'linear-gradient(195deg, #49a3f1, #1A73E8)' }}>Submit</Button> */}
          <Button onClick={handleCloseReject} style={{ color: 'linear-gradient(195deg, #49a3f1, #1A73E8)' }}>Submit</Button>
          <Button onClick={handleCloseReject}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ApproveRejectDialog;
