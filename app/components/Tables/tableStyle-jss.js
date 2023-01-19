import { lighten, darken, alpha } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';
import { green, red } from '@mui/material/colors';

// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. Unsupported arrow function syntax.
// Unexpected value type of ConditionalExpression.
const useStyles = makeStyles()((theme) => ({
  root: {
    paddingRight: theme.spacing(1),
  },
  rootTable: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  highlight:
    theme.palette.mode === 'light' ? {
      color: theme.palette.secondary.main,
      backgroundColor: lighten(theme.palette.secondary.light, 0.85),
    } : {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.secondary.dark,
    },
  spacer: {
    flex: '1 1 100%',
  },
  avatar: {
    marginRight: theme.spacing(1)
  },
  flex: {
    display: 'flex'
  },
  actionsToolbar: {
    color: theme.palette.text.secondary,
    flex: '1 0 auto',
  },
  textField: {
    flexBasis: 200,
    width: 300,
    marginTop: 4,
  },
  table: {
    minWidth: 860,
  },
  tableSmall: {
    minWidth: 500,
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  toolbar: {
    backgroundColor: theme.palette.mode === 'dark' ? darken(theme.palette.primary.light, 0.6) : theme.palette.primary.light,
    minHeight: 48,
  },
  title: {
    flex: '0 0 auto',
    '& h6': {
      fontSize: 16,
      color: theme.palette.mode === 'dark' ? darken(theme.palette.primary.light, 0.2) : darken(theme.palette.primary.dark, 0.2),
    }
  },
  button: {
    margin: `${theme.spacing(1)} 0`,
  },
  iconSmall: {
    fontSize: 20,
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  tableChip: {
    margin: theme.spacing(1),
    color: theme.palette.common.white
  },
  /*
  -----------------------
  ' Table Style '
  ' - Odd Even Stripped
  ' - Hover Style
  ' - Bordered Style
  ' - Empty Table
  ' - Table SIze
  -----------------------
  */
  stripped: {
    '& tbody tr:nth-of-type(even)': {
      background: theme.palette.mode === 'dark' ? alpha(theme.palette.grey[900], 0.5) : theme.palette.grey[50]
    }
  },
  hover: {
    '& tbody tr:hover': {
      background: theme.palette.mode === 'dark' ? darken(theme.palette.primary.light, 0.8) : lighten(theme.palette.primary.light, 0.5)
    }
  },
  bordered: {
    border: theme.palette.mode === 'dark' ? `1px solid ${theme.palette.grey[900]}` : `1px solid ${theme.palette.primary.light}`,
    '& thead tr': {
      background: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.primary.light
    },
    '& td, th': {
      border: theme.palette.mode === 'dark' ? `1px solid ${theme.palette.grey[900]}` : `1px solid ${theme.palette.primary.light}`
    },
    '& tr td, tr th': {
      '&:first-of-type': {
        borderLeft: 'none'
      },
      '&:last-child': {
        borderRight: 'none'
      }
    }
  },
  nodata: {
    textAlign: 'center',
    padding: '10px 10px 40px',
    fontSize: 24,
    lineHeight: '16px',
    color: theme.palette.grey[500],
    '& svg': {
      position: 'relative',
      top: -2,
      width: 26,
      height: 26,
      margin: '0 6px',
      fill: theme.palette.grey[500],
    }
  },
  small: {
    '& tr': {
      height: 24,
      '& td, th': {
        padding: '4px 10px',
        fontSize: 12
      }
    }
  },
  medium: {
    '& tr': {
      height: 48,
      '& td, th': {
        padding: '4px 56px 4px 24px',
        fontSize: 14
      }
    }
  },
  big: {
    '& tr': {
      height: 64,
      '& td, th': {
        padding: '8px 56px 8px 24px',
        fontSize: 18
      }
    }
  },
  settings: {
    background: theme.palette.background.default,
    padding: 20,
    borderRadius: theme.rounded.medium
  },
  up: {
    color: green[500],
    '& svg': {
      fill: green[500],
    }
  },
  down: {
    color: red[500],
    '& svg': {
      fill: red[500],
    }
  },
  flat: {
    color: theme.palette.divider,
    '& svg': {
      fill: theme.palette.divider,
    }
  },
  chartTable: {
    '& svg': {
      '& [class*="recharts-bar-rectangle"] path': {
        fill: alpha(theme.palette.primary.main, 0.5)
      }
    }
  }
}));

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export default useStyles;
