import { makeStyles } from 'tss-react/mui';
import { lighten } from '@mui/material/styles';

const useStyles = makeStyles()((theme, _params, classes) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    marginBottom: theme.spacing(3),
    boxShadow: theme.shade.light,
    color: theme.palette.text.primary,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
    [`&.${classes.noMargin}`]: {
      margin: 0
    },
  },
  descBlock: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(3),
    }
  },
  titleText: {
    flex: 1
  },
  title: {
    position: 'relative',
    textTransform: 'capitalize',
    fontSize: 24,
    fontWeight: 400,
    color: theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.primary.dark,
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
      fontWeight: 600,
      marginBottom: theme.spacing(1)
    }
  },
  description: {
    maxWidth: 960,
    paddingTop: theme.spacing(0.5),
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center'
    }
  },
  content: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1),
    borderRadius: theme.rounded.medium,
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(2)
    }
  },
  whiteBg: {
    backgroundColor: 'transparent',
    margin: 0,
    padding: 0,
  },
  noMargin: {},
  colorMode: {
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.main,
    [`& .${classes.title}`]: {
      color: theme.palette.grey[100],
      '&:after': {
        borderBottom: `5px solid ${theme.palette.primary.light}`
      }
    },
    [`& .${classes.description}`]: {
      color: theme.palette.grey[100],
    }
  },
  overflowX: {
    width: '100%',
    overflowX: 'auto',
  },
  iconTitle: {
    borderRadius: theme.rounded.small,
    border: theme.palette.mode === 'dark' ? 'none' : `1px solid ${lighten(theme.palette.primary.dark, 0.9)}`,
    boxShadow: `0 2px 15px -5px ${theme.palette.primary.main}`,
    background: theme.palette.mode === 'dark' ? theme.palette.primary.main : lighten(theme.palette.primary.light, 0.5),
    width: 48,
    height: 48,
    textAlign: 'center',
    lineHeight: '44px',
    verticalAlign: 'middle',
    marginRight: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
    '& i': {
      fontSize: 28,
      verticalAlign: 'baseline',
      color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.primary.main
    }
  }
}));

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export default useStyles;
