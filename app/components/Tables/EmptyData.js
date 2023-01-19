import React from 'react';
import PropTypes from 'prop-types';

import TableIcon from '@mui/icons-material/Apps';
import useStyles from 'dan-components/Tables/tableStyle-jss';

function EmptyData(props) {
  const { classes } = useStyles();
  return (
    <div className={classes.nodata}>
      <TableIcon />
      No Data
    </div>
  );
}

EmptyData.propTypes = {

};

export default EmptyData;
