import { makeStyles } from 'tss-react/mui';
import { alpha } from '@mui/material/styles';
import {
  lightGreen, red, amber, grey
} from '@mui/material/colors';

const categoryWidth = 100;
const listWidth = 180;

const useStyles = makeStyles()((theme, _params, classes) => ({
  bigSidebar: {
    color: theme.palette.text.primary,
    padding: `${theme.spacing(1)} 0`,
    position: 'relative',
    zIndex: 10,
    height: '100%',
    display: 'flex',
    '&:before': {
      content: '""',
      width: '100%',
      height: '100%',
      backgroundColor: theme.palette.mode === 'dark' ? alpha(theme.palette.background.paper, 0.75) : alpha(theme.palette.background.paper, 0.9),
      boxShadow: theme.shade.light,
      backdropFilter: 'saturate(180%) blur(20px)',
      position: 'absolute',
      top: 0,
      left: 0
    }
  },
  category: {
    width: categoryWidth,
    [`& .${classes.fixedWrap}`]: {
      paddingBottom: theme.spacing(8),
    }
  },
  icon: {},
  text: {},
  active: {},
  selected: {},
  fixedWrap: {
    position: 'fixed',
    overflow: 'auto',
    height: '100%',
    '&::-webkit-scrollbar': {
      width: 8,
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: 12,
      backgroundColor: 'rgba(0,0,0,0)',
    },
    '&:hover': {
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,0.2)',
        border: '1px solid rgba(255,255,255,0.3)',
      }
    }
  },
  avatarHead: {
    textAlign: 'center',
    width: '100%',
    padding: theme.spacing(0.5),
    marginBottom: theme.spacing(1),
  },
  statusMenu: {
    '& ul': {
      paddingTop: 0,
    },
    '& li': {
      width: 180
    }
  },
  swipeDrawerPaper: {
    width: categoryWidth + listWidth,
  },
  profile: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  name: {
    textAlign: 'left',
    marginLeft: theme.spacing(1),
    fontSize: 14,
    '& h5': {
      marginBottom: 0
    }
  },
  pinned: {},
  dotStatus: {
    width: theme.spacing(1.5),
    height: theme.spacing(1.5),
    display: 'inline-block',
    borderRadius: '50%',
    border: '1px solid #fff',
    marginRight: theme.spacing(1),
    [`&.${classes.pinned}`]: {
      position: 'absolute',
      bottom: 3,
      left: 60,
    }
  },
  online: {
    backgroundColor: lightGreen[500]
  },
  bussy: {
    backgroundColor: red[500]
  },
  idle: {
    backgroundColor: amber[500]
  },
  offline: {
    backgroundColor: grey[500]
  },
  menuHead: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
    borderRadius: 4,
    '&:hover': {
      background: theme.palette.action.hover,
    },
    [`&.${classes.active}`]: {
      '&:before': {
        content: '""',
        position: 'absolute',
        width: 5,
        height: 68,
        borderRadius: 5,
        top: 0,
        left: 0,
        background: alpha(theme.palette.primary.main, 0.5)
      },
      [`& .${classes.icon}, .${classes.text}`]: {
        color: theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.primary.main,
      },
    },
    [`& .${classes.icon}`]: {
      color: alpha(theme.palette.text.secondary, 0.54),
      display: 'block',
      fontSize: 28,
      marginBottom: theme.spacing(1),
    },
    [`& .${classes.text}`]: {
      width: 80,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      fontSize: 12,
      color: theme.palette.text.secondary
    }
  },
  item: {},
  listMenu: {
    width: listWidth,
    marginTop: -10,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    '& > ul': {
      width: listWidth,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
      paddingBottom: theme.spacing(8),
    },
    [`& .${classes.icon}`]: {
      color: alpha(theme.palette.text.secondary, 0.54),
      fontSize: 22,
    },
    [`& .${classes.text}`]: {
      paddingLeft: 0,
      paddingRight: 0,
      '& span': {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        fontSize: 12,
        display: 'block'
      }
    },
    [`& .${classes.item}`]: {
      borderRadius: 40,
      textAlign: 'left',
      paddingLeft: 0,
      margin: '4px 0',
      '& > div:first-of-type': {
        margin: `0 ${theme.spacing(1)}`,
        minWidth: 'auto'
      },
      [`&.${classes.active}`]: {
        backgroundColor: theme.palette.mode === 'dark' ? alpha(theme.palette.primary.main, 0.24) : alpha(theme.palette.primary.main, 0.3),
        [`& .${classes.icon}`]: {
          color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark,
        },
        [`& .${classes.text}`]: {
          '& span': {
            color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark,
          }
        },
        '&:hover': {
          backgroundColor: theme.palette.mode === 'dark' ? alpha(theme.palette.primary.main, 0.24) : alpha(theme.palette.primary.main, 0.3),
        }
      }
    }
  },
  drawerPaperClose: {
    width: 0,
    padding: 0,
    overflowX: 'hidden',
    '& ul': {
      position: 'relative'
    },
  },
  userShifted: {
    marginTop: theme.spacing(7),
    [`& .${classes.avatarHead}`]: {
      marginTop: theme.spacing(2)
    }
  },
  title: {
    fontSize: 10,
    textTransform: 'uppercase',
    marginTop: theme.spacing(2),
    paddingLeft: 0,
    display: 'block',
    color: theme.palette.primary.main,
    lineHeight: '28px',
    fontWeight: '900'
  },
  childMenuWrap: {
    opacity: 0,
    transform: 'translateX(-5px)'
  },
  menuLoaded: {
    opacity: 1,
    transform: 'translateX(0px)',
    transition: 'all 0.2s ease-out'
  }
}));

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export default useStyles;
