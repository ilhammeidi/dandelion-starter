import { makeStyles } from 'tss-react/mui';
import { alpha, darken } from '@mui/material/styles';
import { gradientBgLight, gradientBgDark } from 'containers/Templates/appStyles-jss';
const drawerWidth = 240;
const drawerBigWidth = 280;

const useStyles = makeStyles()((theme, _params, classes) => ({
  appBar: {
    background: 'rgba(0,0,0,0)',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin', 'background'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [`& .${classes.menuButton}`]: {
      color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main,
      backgroundColor: 'transparent',
      boxShadow: 'none',
      zIndex: 10,
    },
    [`&.${classes.left}`]: {
      [`& .${classes.menuButton}`]: {
        marginLeft: 13,
      },
      [`& .${classes.headerTitle}`]: {
        left: theme.spacing(2),
      }
    },
    [`&.${classes.leftBig}`]: {
      [`& .${classes.menuButton}`]: {
        marginLeft: 30,
        marginRight: theme.spacing(2),
        [theme.breakpoints.down('lg')]: {
          marginLeft: 13,
        },
      },
      [`& .${classes.headerTitle}`]: {
        left: 0,
      }
    },
    [`&.${classes.right}`]: {
      [`& .${classes.menuButton}`]: {
        marginRight: 13,
      },
      [`& .${classes.headerTitle}`]: {
        right: theme.spacing(2),
      },
      '& > div': {
        flexDirection: 'row-reverse'
      },
      [`& .${classes.flex}`]: {
        textAlign: 'left'
      }
    },
  },
  attachedbar: {
    position: 'relative',
    [`& .${classes.menuButton}`]: {
      margin: `0 ${theme.spacing(2)}`
    },
    [`& .${classes.wrapper}`]: {
      [theme.breakpoints.down('xl')]: {
        border: `1px solid ${theme.palette.divider}`
      },
    }
  },
  floatingBar: {
    position: 'fixed'
  },
  appMenu: {
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    background: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
    [theme.breakpoints.down('lg')]: {
      padding: `${theme.spacing(0.5)} 0`,
    },
    [theme.breakpoints.up('lg')]: {
      background: alpha(theme.palette.background.paper, 0.8),
    },
    color: theme.palette.text.primary
  },
  flex: {
    flex: 1,
    textAlign: 'right'
  },
  flexDefault: {
    flex: 1,
    textAlign: 'right'
  },
  left: {},
  leftBig: {},
  right: {},
  appBarShift: {
    transition: theme.transitions.create(['width', 'margin', 'background'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [`&.${classes.left}`]: {
      [`& .${classes.menuButton}`]: {
        [theme.breakpoints.up('lg')]: {
          marginLeft: -20
        }
      },
      [theme.breakpoints.up('lg')]: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
      },
    },
    [`&.${classes.leftBig}`]: {
      [`& .${classes.menuButton}`]: {
        [theme.breakpoints.up('lg')]: {
          marginLeft: -20
        }
      },
      [theme.breakpoints.up('lg')]: {
        marginLeft: drawerBigWidth,
        width: `calc(100% - ${drawerBigWidth}px)`,
      },
    },
    [`&.${classes.right}`]: {
      [`& .${classes.menuButton}`]: {
        [theme.breakpoints.up('lg')]: {
          marginRight: -20
        }
      },
      [theme.breakpoints.up('lg')]: {
        marginRight: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
      },
    },
    [`& .${classes.menuButton}`]: {
      backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.primary.light,
      boxShadow: theme.glow.medium,
    },
    [`& .${classes.headerAction}`]: {
      marginLeft: theme.spacing(1)
    },
    [`&.${classes.darker}`]: {
      [`& .${classes.menuButton}`]: {
        color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main,
      }
    }
  },
  menuButton: {},
  hide: {
    display: 'none',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  dark: {},
  light: {},
  wrapper: {
    fontFamily: theme.typography.fontFamily,
    position: 'relative',
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(1),
    borderRadius: 22,
    display: 'inline-block',
    '&:hover': {
      background: alpha(theme.palette.common.white, 0.25),
    },
    [`&.${classes.light}`]: {
      background: alpha(theme.palette.common.white, 0.2),
    },
    [`&.${classes.dark}`]: {
      background: theme.palette.mode === 'dark' ? theme.palette.grey[700] : alpha(theme.palette.common.white, 0.8),
      boxShadow: theme.shade.light,
      '& input': {
        color: theme.palette.grey[700],
      },
      '& input::placeholder': {
        color: theme.palette.grey[400],
        opacity: 1 /* Firefox */
      },
      '& input:-ms-input-placeholder': {
        color: theme.palette.grey[400],
      },
      '& input::-ms-input-placeholder': { /* Internet Explorer 10-11 */
        color: theme.palette.grey[400],
      }
    },
    [`& .${classes.miniInput}`]: {
      width: 70
    },
  },
  searchWrapper: {
    [theme.breakpoints.down('lg')]: {
      flex: 1,
      textAlign: 'right'
    }
  },
  search: {
    width: theme.spacing(9),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
  },
  miniInput: {
    paddingLeft: 0,
    textIndent: '999999px'
  },
  gradientBg: {},
  solidBg: {},
  darker: {
    backgroundAttachment: 'fixed',
    boxShadow: theme.shadows[3],
    [`&.${classes.gradientBg}`]: {
      backgroundImage: theme.palette.mode === 'dark' ? gradientBgDark(theme) : gradientBgLight(theme),
    },
    [`&.${classes.solidBg}`]: {
      backgroundColor: theme.palette.mode === 'dark' ? darken(theme.palette.primary.main, 0.4) : theme.palette.primary.main
    },
    [`& .${classes.menuButton}`]: {
      color: theme.palette.common.white
    }
  },
  fixed: {
    position: 'fixed',
    left: 0,
    top: 0,
    [theme.breakpoints.up('lg')]: {
      top: theme.spacing(-8)
    }
  },
  separatorV: {
    borderLeft: `1px solid ${theme.palette.grey[300]}`,
    height: 20,
    margin: '0 10px',
    opacity: 0.4
  },
  notifMenu: {
    '& li': {
      height: 'auto',
      '& h3': {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
      }
    }
  },
  badgeMenu: {
    '& span': {
      top: 0,
      right: -30
    }
  },
  textNotif: {
    '& span': {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      display: 'block'
    }
  },
  notifIcon: {
    '& i': {
      width: 28,
      height: 28,
      fontSize: 28
    },
    [`&.${classes.dark}`]: {
      '& i': {
        color: theme.palette.text.primary,
      }
    },
    [`&.${classes.light}`]: {
      '& i': {
        color: theme.palette.common.white,
      }
    },
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 20px 5px',
    height: 64,
    position: 'absolute',
    width: '100%',
    fontSize: 16,
    margin: 0,
    fontWeight: 500,
    textDecoration: 'none',
    color: theme.palette.text.primary,
    '& img': {
      marginRight: 10,
      width: 30
    },
  },
  mainMenu: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 0),
    boxShadow: theme.shadows[3],
    position: 'relative',
    transition: 'padding 0.3s ease',
    '& > div': {
      display: 'flex',
      justifyContent: 'center'
    }
  },
  headMenu: {
    fontSize: 12,
    padding: `${theme.spacing(0.5)} ${theme.spacing(1)} ${theme.spacing(0.5)} ${theme.spacing(2)}`,
    minHeight: 'auto',
    margin: `0 ${theme.spacing(0.5)}`,
    lineHeight: '2em',
    color: theme.palette.text.primary
  },
  opened: {
    color: theme.palette.primary.main,
    boxShadow: `inset 0 0 0 1px ${theme.palette.primary.main}`,
    '& svg': {
      fill: theme.palette.primary.main,
    }
  },
  rightIcon: {
    marginLeft: theme.spacing(0.5),
    opacity: 0.3
  },
  selected: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.light,
    '&:hover': {
      background: theme.palette.primary.main,
    },
    '& svg': {
      fill: theme.palette.primary.light,
    },
    [`& .${classes.rightIcon}`]: {
      opacity: 0.7
    }
  },
  paperMenu: {
    overflow: 'auto',
    maxHeight: 500
  },
  popperClose: {
    pointerEvents: 'none',
    zIndex: 2
  },
  title: {
    fontSize: 10,
    textTransform: 'uppercase',
    display: 'block',
    color: theme.palette.secondary.main,
    lineHeight: '28px',
    fontWeight: 'bold',
    background: theme.palette.background.paper,
    borderRadius: theme.rounded.medium
  },
  dropDownMenu: {
    minWidth: 300,
    marginTop: theme.spacing(1.5),
    position: 'relative'
  },
  active: {},
  menuItem: {
    '& span': {
      fontSize: 14,
    },
    [`&.${classes.active}`]: {
      borderLeft: `5px solid ${theme.palette.primary.main}`,
      backgroundColor: theme.palette.mode === 'dark' ? alpha(theme.palette.secondary.main, 0.24) : theme.palette.secondary.light,
      '& span': {
        color: theme.palette.primary.main,
      },
      '&:hover': {
        backgroundColor: theme.palette.mode === 'dark' ? alpha(theme.palette.secondary.main, 0.24) : theme.palette.secondary.light,
      }
    }
  },
  megaMenu: {
    [`& .${classes.title}`]: {
      paddingLeft: theme.spacing(2)
    }
  },
  megaItem: {
    display: 'inline-block',
    width: 'auto',
    margin: theme.spacing(1),
    borderRadius: theme.rounded.big,
    padding: `${theme.spacing(0.25)} ${theme.spacing(1)}`,
    '& span': {
      fontSize: 14,
    },
    '& div': {
      padding: 0
    },
    [`&.${classes.active}`]: {
      border: `1px solid ${theme.palette.primary.main}`,
      backgroundColor: theme.palette.mode === 'dark' ? alpha(theme.palette.secondary.main, 0.24) : theme.palette.secondary.light,
      '& span': {
        color: theme.palette.primary.main,
      },
      '&:hover': {
        backgroundColor: theme.palette.mode === 'dark' ? alpha(theme.palette.secondary.main, 0.24) : theme.palette.secondary.light,
      }
    }
  },
  bigIcon: {
    display: 'block',
    marginTop: 40,
    '& i': {
      fontSize: 100,
      color: theme.palette.primary.main,
      margin: '0 auto',
      display: 'inherit'
    }
  },
  button: {},
  headerProperties: {
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    zIndex: 1
  },
  fadeOut: {},
  invert: {},
  headerAction: {
    margin: `0 ${theme.spacing(3)}`,
    transition: 'opacity 0.5s ease',
    [`& .${classes.button}`]: {
      margin: `0 ${theme.spacing(1)} / 2`,
      '& i': {
        color: alpha(theme.palette.common.white, 0.87),
        width: 28,
        height: 28,
        fontSize: 28,
      }
    },
    [`&.${classes.fadeOut}`]: {
      opacity: 0,
    },
    [`&.${classes.invert}`]: {
      [`& .${classes.button}`]: {
        '& i': {
          color: alpha(theme.palette.text.primary, 0.5),
        }
      }
    }
  },
  show: {},
  headerTitle: {
    transition: 'all 0.3s ease',
    fontSize: theme.spacing(3),
    position: 'absolute',
    textTransform: 'capitalize',
    fontWeight: 700,
    top: 60,
    color: theme.palette.common.white,
    opacity: 0,
    [`&.${classes.show}`]: {
      top: theme.spacing(1),
      opacity: 0.87
    }
  },
  swipeDrawerPaper: {
    width: drawerWidth,
  },
  searchHeaderMenu: {
    flex: 1,
    flexDirection: 'row-reverse',
    display: 'flex',
    alignItems: 'center'
  }
}));

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export default useStyles;
