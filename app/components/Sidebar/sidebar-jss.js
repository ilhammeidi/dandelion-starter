import { fade } from '@material-ui/core/styles/colorManipulator';
import lightGreen from '@material-ui/core/colors/lightGreen';
import red from '@material-ui/core/colors/red';
import amber from '@material-ui/core/colors/amber';
import grey from '@material-ui/core/colors/grey';

const drawerWidth = 240;
const styles = theme => ({
  user: {
    justifyContent: 'center'
  },
  drawer: {
    width: drawerWidth
  },
  drawerPaper: {
    position: 'relative',
    height: '100%',
    overflow: 'hidden',
    border: 'none',
    background: 'none',
    color: theme.palette.text.primary,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  swipeDrawerPaper: {
    width: drawerWidth,
  },
  opened: {
    '& $primary, & $icon': {
      color: theme.palette.primary.main,
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      width: 5,
      height: theme.spacing(6),
      top: 0,
      left: 0,
      background: fade(theme.palette.primary.main, 0.5)
    }
  },
  drawerPaperClose: {
    width: theme.spacing(8),
    position: 'absolute',
    overflowX: 'hidden',
    background: theme.palette.background.paper,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    '& $user': {
      justifyContent: 'flex-start'
    },
    '& $bigAvatar': {
      width: 40,
      height: 40,
    },
    '& nav': {
      display: 'none'
    },
    '&:hover': {
      width: drawerWidth,
      boxShadow: theme.shadows[6],
      '& nav': {
        display: 'block'
      }
    },
    '& $brand': {
      display: 'none'
    },
    '& $profile': {
      flexDirection: 'row',
      top: theme.spacing(6),
      padding: theme.spacing(0.5),
      textAlign: 'left',
      '& button': {
        width: 'auto'
      }
    },
    '& $avatar': {
      marginRight: theme.spacing(3)
    },
    '& $menuContainer': {
      '&$menuContainer': {
        paddingTop: theme.spacing(10),
        paddingBottom: 0,
      }
    },
  },
  drawerInner: {
    // Make the items inside not wrap when transitioning:
    height: '100%',
    position: 'fixed',
    backgroundColor: theme.palette.type === 'dark' ? fade(theme.palette.background.paper, 0.75) : fade(theme.palette.background.paper, 0.9),
    boxShadow: theme.shade.light,
    backdropFilter: 'saturate(180%) blur(20px)'
  },
  drawerInnerMobile: {
    // Make the items inside not wrap when transitioning:
    height: '100%',
    backgroundColor: theme.palette.type === 'dark' ? fade(theme.palette.background.paper, 0.75) : fade(theme.palette.background.paper, 0.95),
  },
  drawerHeader: {
    padding: '0',
    zIndex: 1,
    position: 'relative',
    ...theme.mixins.toolbar,
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 80,
    height: 80,
    boxShadow: theme.glow.light
  },
  brandBar: {
    transition: theme.transitions.create(['width', 'margin', 'background'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    '&:after': {
      transition: theme.transitions.create(['box-shadow'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }
  },
  darker: {
    background: 'none',
  },
  nested: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    margin: `${theme.spacing(0.5)}px 0`,
    [theme.breakpoints.down('lg')]: {
      paddingLeft: theme.spacing(3)
    }
  },
  child: {
    '& a': {
      paddingLeft: theme.spacing(6),
    }
  },
  title: {
    fontSize: 10,
    textTransform: 'uppercase',
    paddingLeft: theme.spacing(10),
    marginTop: theme.spacing(3),
    display: 'block',
    color: theme.palette.secondary.main,
    lineHeight: '28px',
    fontWeight: 'bold'
  },
  dense: {
    marginLeft: -15,
    '& > $title:first-child': {
      margin: '0'
    },
    '& $head': {
      paddingLeft: theme.spacing(10)
    }
  },
  active: {
    backgroundColor: theme.palette.type === 'dark' ? fade(theme.palette.primary.main, 0.24) : theme.palette.primary.light,
    '& $primary': {
      color: theme.palette.type === 'dark' ? theme.palette.common.white : theme.palette.primary.dark,
    },
    '& $icon svg': {
      fill: theme.palette.primary.dark,
    },
    '&:hover, &:focus': {
      backgroundColor: theme.palette.type === 'dark' ? fade(theme.palette.primary.main, 0.24) : theme.palette.primary.light,
    }
  },
  nolist: {
    listStyle: 'none',
  },
  primary: {
    whiteSpace: 'nowrap'
  },
  icon: {
    minWidth: theme.spacing(5),
    fill: theme.palette.type === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark,
  },
  iconed: {},
  head: {
    padding: `${theme.spacing(1)}px 0`,
    margin: `${theme.spacing(1)}px 0`,
    borderRadius: `0 ${theme.spacing(3)}px ${theme.spacing(3)}px 0`,
    paddingLeft: theme.spacing(3),
    '&$iconed': {
      paddingLeft: theme.spacing(3),
    },
    '& svg[class^="MuiSvgIcon"]': {
      left: -10,
      position: 'relative'
    },
  },
  headCapital: {
    padding: `${theme.spacing(1)}px 0 ${theme.spacing(1)}px ${theme.spacing(9)}px`,
    left: theme.spacing(1) * -2,
    position: 'relative',
    textTransform: 'uppercase',
    borderRadius: `0 ${theme.spacing(3)}px ${theme.spacing(3)}px 0`,
    margin: `${theme.spacing(1)}px`,
    '& span': {
      fontSize: 14
    }
  },
  copyright: {
    color: theme.palette.text.secondary,
    background: theme.palette.background.paper,
    padding: theme.spacing(2),
    position: 'fixed',
    [theme.breakpoints.up('lg')]: {
      background: 'none',
      position: 'absolute',
    },
    left: theme.spacing(3),
    lineHeight: '24px',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 10px 5px',
    height: 64,
    position: 'relative',
    textDecoration: 'none',
    fontSize: 16,
    margin: 0,
    fontWeight: 500,
    color: theme.palette.text.primary,
    '& img': {
      width: 30,
      marginRight: 10,
    },
  },
  brandBig: {
    paddingTop: theme.spacing(4),
    position: 'relative',
    textAlign: 'center',
    '& img': {
      width: 68
    },
    '& h3': {
      fontSize: 18,
      marginTop: theme.spacing(2),
      fontWeight: 500,
      color: theme.palette.text.primary,
    }
  },
  profile: {
    height: 120,
    width: '100%',
    display: 'flex',
    fontSize: 14,
    padding: 10,
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
    position: 'absolute',
    margin: `${theme.spacing(2)}px 0`,
    zIndex: 0,
    '& h4': {
      fontSize: 18,
      marginBottom: 0,
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      width: 110
    },
    '& button': {
      fontSize: 12,
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      width: 110,
      display: 'block',
      overflow: 'hidden',
      textTransform: 'capitalize',
      padding: 0,
      minHeight: 20,
      marginTop: 4,
    }
  },
  statusMenu: {
    '& li': {
      width: 100
    }
  },
  dotStatus: {
    width: theme.spacing(1),
    height: theme.spacing(1),
    display: 'inline-block',
    borderRadius: '50%',
    marginRight: theme.spacing(0.5)
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
  rounded: {},
  landingNav: {},
  withProfile: {},
  menuContainer: {
    overflow: 'auto',
    height: 'calc(100% - 64px)',
    width: drawerWidth,
    position: 'relative',
    display: 'block',
    padding: `${theme.spacing(5)}px 0`,
    '&$withProfile': {
      paddingTop: theme.spacing(18)
    },
    '&$landingNav': {
      [theme.breakpoints.up('lg')]: {
        paddingTop: theme.spacing(5)
      },
      [theme.breakpoints.down('lg')]: {
        height: 'calc(100% - 164px)',
        paddingTop: theme.spacing(5)
      }
    },
    '&$rounded': {
      paddingRight: theme.spacing(1.5),
      '& a': {
        borderRadius: `0 ${theme.spacing(3)}px ${theme.spacing(3)}px 0`,
      },
      '& $opened': {
        '&:before': {
          background: theme.palette.primary.main
        }
      }
    },
    '&::-webkit-scrollbar': {
      width: 8,
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: 12,
      backgroundColor: 'rgba(0,0,0,0)',
    },
    '&:hover': {
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,0.3)',
        border: '1px solid rgba(255,255,255,0.4)',
      }
    }
  },
  divider: {
    marginTop: theme.spacing(1)
  },
  badge: {
    height: 'auto'
  }
});

export default styles;
