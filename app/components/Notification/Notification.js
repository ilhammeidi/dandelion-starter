import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from 'tss-react/mui';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const useStyles = makeStyles()((theme) => ({
  close: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    padding: 0,
  },
}));

function Notification(props) {
  const { classes } = useStyles();
  const handleClose = (event, reason) => {
    const { close } = props;
    if (reason === 'clickaway') {
      return;
    }
    close('crudTableDemo');
  };

  const { message } = props;
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={message !== ''}
      autoHideDuration={3000}
      onClose={() => handleClose()}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={message}
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={() => handleClose()}
          size="large">
          <CloseIcon />
        </IconButton>,
      ]}
    />
  );
}

Notification.propTypes = {

  close: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default Notification;
