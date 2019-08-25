import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  close: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    padding: 0,
  },
});

class Notification extends React.Component {
  handleClose = (event, reason) => {
    const { close } = this.props;
    if (reason === 'clickaway') {
      return;
    }
    close('crudTableDemo');
  };

  render() {
    const { classes, message } = this.props;
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={message !== ''}
        autoHideDuration={3000}
        onClose={() => this.handleClose()}
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
            onClick={() => this.handleClose()}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    );
  }
}

Notification.propTypes = {
  classes: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default withStyles(styles)(Notification);
