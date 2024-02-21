import * as React from "react";
import {Button,Dialog,DialogTitle,DialogContent,DialogActions,IconButton,Typography,Stack,styled} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDeleteModel(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDeleteModel.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs(props) {
  // eslint-disable-next-line react/prop-types
  const {isOpenDeleteModel,handleCloseDeleteModel,deleteData,id } = props;
  const Delete =()=>{
    deleteData(id);
    handleCloseDeleteModel();
  }

  return (
    <div>
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={isOpenDeleteModel}
        className="delete-model"
      >
        <BootstrapDeleteModel
          id="customized-dialog-title"
          onClose={handleCloseDeleteModel}
        >
          Delete
        </BootstrapDeleteModel>
        <DialogContent dividers>
          <Typography gutterBottom p={3}>
            Are you sure you want to delete this item?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" color="error" onClick={Delete}>Yes</Button>
            <Button variant="contained" onClick={handleCloseDeleteModel}>No</Button>
          </Stack>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
