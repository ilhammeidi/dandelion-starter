import React from 'react';
import PropTypes from 'prop-types';

import TableIcon from '@material-ui/icons/Apps';
import styles from 'dan-components/Tables/tableStyle-jss';

function EmptyData(props) {
  
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
