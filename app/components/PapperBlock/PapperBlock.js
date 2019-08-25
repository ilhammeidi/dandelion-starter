import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Ionicon from 'react-ionicons';
import styles from './papperStyle-jss';

class PapperBlock extends React.Component {
  render() {
    const {
      classes,
      title,
      desc,
      children,
      whiteBg,
      noMargin,
      colorMode,
      overflowX,
      icon
    } = this.props;
    return (
      <div>
        <Paper className={classNames(classes.root, noMargin && classes.noMargin, colorMode && classes.colorMode)} elevation={0}>
          <div className={classes.descBlock}>
            <span className={classes.iconTitle}>
              <Ionicon icon={icon} />
            </span>
            <div className={classes.titleText}>
              <Typography variant="h6" component="h2" className={classes.title}>
                {title}
              </Typography>
              <Typography component="p" className={classes.description}>
                {desc}
              </Typography>
            </div>
          </div>
          <section className={classNames(classes.content, whiteBg && classes.whiteBg, overflowX && classes.overflowX)}>
            {children}
          </section>
        </Paper>
      </div>
    );
  }
}

PapperBlock.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  icon: PropTypes.string,
  children: PropTypes.node.isRequired,
  whiteBg: PropTypes.bool,
  colorMode: PropTypes.bool,
  noMargin: PropTypes.bool,
  overflowX: PropTypes.bool,
};

PapperBlock.defaultProps = {
  whiteBg: false,
  noMargin: false,
  colorMode: false,
  overflowX: false,
  icon: 'ios-bookmark-outline'
};

export default compose(withStyles(styles))(PapperBlock);
