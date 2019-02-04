const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: `${theme.spacing.unit * 2}px 0`,
    borderRadius: 40,
    overflow: 'hidden',
    boxShadow: theme.shadows[5]
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  wrapper: {
    fontFamily: theme.typography.fontFamily,
    position: 'relative',
    marginRight: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit,
    borderRadius: 2,
    display: 'block',
    color: theme.palette.text.secondary,
    '& svg': {
      fill: theme.palette.text.secondary
    }
  },
  cart: {
    '& svg': {
      fill: theme.palette.text.secondary
    }
  },
  search: {
    width: 'auto',
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    font: 'inherit',
    padding: `${theme.spacing.unit}px ${theme.spacing.unit}px ${theme.spacing.unit}px ${theme.spacing.unit * 4}px`,
    border: 0,
    display: 'block',
    verticalAlign: 'middle',
    whiteSpace: 'normal',
    background: 'none',
    margin: 0, // Reset for Safari
    color: 'inherit',
    width: '100%',
    '&:focus': {
      outline: 0,
    },
  },
  toggleContainer: {
    height: 56,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: `${theme.spacing.unit}px 0`,
  },
  inputHeader: {
    font: 'inherit',
    padding: `${theme.spacing.unit}px ${theme.spacing.unit}px ${theme.spacing.unit}px ${theme.spacing.unit * 9}px`,
    border: 0,
    display: 'block',
    verticalAlign: 'middle',
    whiteSpace: 'normal',
    background: 'none',
    margin: 0, // Reset for Safari
    color: 'inherit',
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    },
    '& input': {
      transition: theme.transitions.create('width'),
      padding: 0,
      color: theme.palette.common.white,
      width: 100,
      '&:focus': {
        width: 250,
        textIndent: 0,
        outline: 0,
      },
    },
    '&:after': {
      display: 'none'
    },
    '& ::-webkit-input-placeholder': { /* Chrome/Opera/Safari */
      color: 'rgba(255,255,255,1)'
    },
    '& ::-moz-placeholder': { /* Firefox 19+ */
      color: 'rgba(255,255,255,1)'
    },
    '& :-ms-input-placeholder': { /* IE 10+ */
      color: 'rgba(255,255,255,1)'
    },
    '& :-moz-placeholder': { /* Firefox 18- */
      color: 'rgba(255,255,255,1)'
    },
  },
  containerSearch: {
    flexGrow: 1,
    position: 'relative',
    color: theme.palette.text.primary
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
    overflow: 'hidden'
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
});

export default styles;
