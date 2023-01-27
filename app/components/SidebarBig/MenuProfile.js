import React, { useState } from 'react';
import ButtonBase from '@mui/material/ButtonBase';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import dummy from 'dan-api/dummy/dummyContents';
import useStyles from './sidebarBig-jss';

function MenuProfile() {
  const { classes, cx } = useStyles();
  const [status, setStatus] = useState(dummy.user.status);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeStatus = st => {
    setStatus(st);
    handleClose();
  };

  const changeStatus = st => {
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
      <ButtonBase className={classes.avatarHead} onClick={handleOpen}>
        <Avatar
          alt={dummy.user.name}
          src={dummy.user.avatar}
          className={cx(classes.avatar, classes.bigAvatar)}
        />
        <i className={cx(classes.dotStatus, classes.pinned, changeStatus(status))} />
      </ButtonBase>
      <Menu
        id="status-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={classes.statusMenu}
      >
        <MenuItem className={classes.profile}>
          <Avatar
            alt={dummy.user.name}
            src={dummy.user.avatar}
            className={cx(classes.avatar, classes.bigAvatar)}
          />
          <div className={classes.name}>
            <h5>{dummy.user.name}</h5>
            <i className={cx(classes.dotStatus, changeStatus(status))} />
            {status}
          </div>
        </MenuItem>
        <MenuItem onClick={() => handleChangeStatus('online')}>
          <i className={cx(classes.dotStatus, classes.online)} />
          online
        </MenuItem>
        <MenuItem onClick={() => handleChangeStatus('idle')}>
          <i className={cx(classes.dotStatus, classes.idle)} />
          idle
        </MenuItem>
        <MenuItem onClick={() => handleChangeStatus('bussy')}>
          <i className={cx(classes.dotStatus, classes.bussy)} />
          bussy
        </MenuItem>
        <MenuItem onClick={() => handleChangeStatus('offline')}>
          <i className={cx(classes.dotStatus, classes.offline)} />
          offline
        </MenuItem>
      </Menu>
    </div>
  );
}

export default MenuProfile;
