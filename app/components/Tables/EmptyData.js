import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableIcon from '@material-ui/icons/Apps';
import styles from 'dan-components/Tables/tableStyle-jss';

function EmptyData(props) {
  const { classes } = props;
  return (
    <div className={classes.nodata}>
      <TableIcon />
      No Data
    </div>
  );
}

EmptyData.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EmptyData);
