import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import ButtonBase from '@material-ui/core/ButtonBase';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import dummy from 'dan-api/dummy/dummyContents';
import styles from './sidebarBig-jss';

class MenuProfile extends React.Component {
  state = {
    status: dummy.user.status,
    anchorEl: null,
  }

  handleOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleChangeStatus = status => {
    this.setState({ status });
    this.handleClose();
  }

  render() {
    const { classes } = this.props;
    const { anchorEl, status } = this.state;
    const setStatus = st => {
      switch (st) {
        case 'online':
          return classes.online;
        case 'idle':
          return classes.idle;
        case 'bussy':
          return classes.bussy;
        default:
          return classes.offline;
      }
    };

    return (
      <div>
        <ButtonBase className={classes.avatarHead} onClick={this.handleOpen}>
          <Avatar
            alt={dummy.user.name}
            src={dummy.user.avatar}
            className={classNames(classes.avatar, classes.bigAvatar)}
          />
          <i className={classNames(classes.dotStatus, classes.pinned, setStatus(status))} />
        </ButtonBase>
        <Menu
          id="status-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          className={classes.statusMenu}
        >
          <MenuItem className={classes.profile}>
            <Avatar
              alt={dummy.user.name}
              src={dummy.user.avatar}
              className={classNames(classes.avatar, classes.bigAvatar)}
            />
            <div className={classes.name}>
              <h5>{dummy.user.name}</h5>
              <i className={classNames(classes.dotStatus, setStatus(status))} />
              {status}
            </div>
          </MenuItem>
          <MenuItem onClick={() => this.handleChangeStatus('online')}>
            <i className={classNames(classes.dotStatus, classes.online)} />
            online
          </MenuItem>
          <MenuItem onClick={() => this.handleChangeStatus('idle')}>
            <i className={classNames(classes.dotStatus, classes.idle)} />
            idle
          </MenuItem>
          <MenuItem onClick={() => this.handleChangeStatus('bussy')}>
            <i className={classNames(classes.dotStatus, classes.bussy)} />
            bussy
          </MenuItem>
          <MenuItem onClick={() => this.handleChangeStatus('offline')}>
            <i className={classNames(classes.dotStatus, classes.offline)} />
            offline
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

MenuProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

MenuProfile.defaultProps = {
  anchorEl: null,
  isLogin: false,
};

export default withStyles(styles)(MenuProfile);
