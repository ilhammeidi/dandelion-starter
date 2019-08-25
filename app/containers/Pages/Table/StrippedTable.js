import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import styles from 'dan-components/Tables/tableStyle-jss';

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return {
    id,
    name,
    calories,
    fat,
    carbs,
    protein
  };
}

const data = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function StrippedTable(props) {
  const { classes } = props;
  return (
    <Fragment>
      <Toolbar className={classes.toolbar}>
        <div className={classes.title}>
          <Typography className={classes.title} variant="h6">Nutrition</Typography>
        </div>
      </Toolbar>
      <div className={classes.rootTable}>
        <Table className={classNames(classes.table, classes.stripped)}>
          <TableHead>
            <TableRow>
              <TableCell padding="default">Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat (g)</TableCell>
              <TableCell align="right">Carbs (g)</TableCell>
              <TableCell align="right">Protein (g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(n => ([
              <TableRow key={n.id}>
                <TableCell padding="default">{n.name}</TableCell>
                <TableCell align="right">{n.calories}</TableCell>
                <TableCell align="right">{n.fat}</TableCell>
                <TableCell align="right">{n.carbs}</TableCell>
                <TableCell align="right">{n.protein}</TableCell>
              </TableRow>
            ]))}
          </TableBody>
        </Table>
      </div>
    </Fragment>
  );
}

StrippedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StrippedTable);
