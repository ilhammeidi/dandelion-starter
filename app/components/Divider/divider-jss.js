import { makeStyles } from 'tss-react/mui';

const space = {
  margin: '40px 0'
};
const useStyles = makeStyles()((theme) => ({
  gradient: {
    extend: space,
    border: 0,
    height: 1,
    background: '#333',
    backgroundImage: 'linear-gradient(to right, #fff, #8c8c8c, #fff)'
  },
  colorDash: {
    border: 0,
    extend: space,
    borderBottom: `1px dashed ${theme.palette.grey[100]}`,
    background: '#999'
  },
  shadow: {
    height: 12,
    extend: space,
    border: 0,
    boxShadow: 'inset 0 12px 12px -12px rgba(0, 0, 0, 0.5)'
  },
  inset: {
    border: 0,
    extend: space,
    height: 0,
    borderTop: '1px solid rgba(0, 0, 0, 0.1)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.3)'
  },
  flairedEdges: {
    overflow: 'visible', /* For IE */
    extend: space,
    height: 30,
    borderStyle: 'solid',
    borderColor: theme.palette.grey[400],
    borderWidth: '1px 0 0 0',
    borderRadius: 20,
    '&:before': {
      display: 'block',
      content: '""',
      height: 30,
      marginTop: -31,
      borderStyle: 'solid',
      borderColor: theme.palette.grey[400],
      borderWidth: '0 0 1px 0',
      borderRadius: 20
    }
  },
  content: {
    overflow: 'visible', /* For IE */
    extend: space,
    padding: 0,
    border: 'none',
    borderTop: theme.palette.mode === 'dark' ? `1px solid ${theme.palette.grey[700]}` : `1px solid ${theme.palette.grey[300]}`,
    color: theme.palette.text.secondary,
    margin: `${theme.spacing(4)} ${theme.spacing(0.5)} ${theme.spacing(2)}`,
    textAlign: 'center',
    '&:after': {
      content: 'attr(data-content)',
      display: 'inline-block',
      position: 'relative',
      top: -15,
      fontSize: 14,
      padding: '0 1.25em',
      background: theme.palette.background.paper
    }
  }
}));

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export default useStyles;
