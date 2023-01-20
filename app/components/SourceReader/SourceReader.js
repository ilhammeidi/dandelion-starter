import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { makeStyles } from 'tss-react/mui';
import Axios from 'axios';
import { connect } from 'react-redux';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism-light';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import lightStyle from 'react-syntax-highlighter/dist/esm/styles/prism/prism';
import darkStyle from 'react-syntax-highlighter/dist/esm/styles/prism/xonokai';
import Button from '@mui/material/Button';

import LinearProgress from '@mui/material/LinearProgress';
import Code from '@mui/icons-material/Code';
import Close from '@mui/icons-material/Close';
import Icon from '@mui/material/Icon';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import codePreview from '../../config/codePreview';

const url = '/api/docs?src=';

const useStyles = makeStyles()((theme) => ({
  button: {
    margin: '8px 5px',
  },
  iconSmall: {
    fontSize: 20,
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  source: {
    textAlign: 'left',
    overflow: 'hidden',
    height: 0,
    position: 'relative',
    transition: 'all .5s',
    margin: '0 -10px',
    '& pre': {
      paddingTop: '80px !important'
    }
  },
  preloader: {
    position: 'absolute',
    top: 36,
    left: 0,
    width: '100%'
  },
  open: {
    height: 'auto',
    minHeight: 20,
  },
  src: {
    padding: 10,
    position: 'absolute',
    top: 10,
    left: 0,
    zIndex: 1,
    fontFamily: 'monospace',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    '& span': {
      fontSize: 14,
    },
    '& p': {
      color: 'grey',
      '& span': {
        marginRight: 5,
        top: 3,
        position: 'relative'
      }
    }
  },
  toggleContainer: {
    height: 56,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    '& button': {
      background: 'rgba(255, 255, 255, 0.4)',
      color: '#000 !important',
      '&:hover': {
        background: 'rgba(255, 255, 255, 0.4) !important',
      }
    },
  },
}));

function SourceReader(props) {
  const { classes, cx } = useStyles();
  const {
    componentName,
    mode
  } = props;
  const [raws, setRaws] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [style, setStyle] = useState(mode);

  const sourceOpen = () => {
    setLoading(true);
  };

  const handleStyle = (event, value) => {
    setStyle(value);
  };

  useEffect(() => {
    if (loading) {
      Axios.get(url + componentName).then(result => {
        setRaws(result.data.records);
        setLoading(false);
      });

      setOpen(!open);
    }
  }, [loading]);

  SyntaxHighlighter.registerLanguage('jsx', jsx);
  if (!codePreview.enable) { return false; }
  return (
    <div>
      <Button onClick={sourceOpen} color="secondary" className={classes.button} size="small">
        { open ? (
          <Close className={cx(classes.leftIcon, classes.iconSmall)} />
        ) : (
          <Code className={cx(classes.leftIcon, classes.iconSmall)} />
        )}
        { open ? 'Hide Code' : 'Show Code' }
      </Button>
      <section dir="ltr" className={cx(classes.source, open ? classes.open : '')}>
        <div className={classes.src}>
          <p>
            <Icon className="description">description</Icon>
            src/app/
            {componentName}
          </p>
          <div className={classes.toggleContainer}>
            <ToggleButtonGroup value={style} exclusive onChange={handleStyle}>
              <ToggleButton value="light">
                Light
              </ToggleButton>
              <ToggleButton value="dark">
                Dark
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>
        {loading && (
          <LinearProgress color="secondary" className={classes.preloader} />
        )}
        {raws.map((raw, index) => ([
          <div key={index.toString()}>
            <SyntaxHighlighter language="jsx" style={style === 'dark' ? darkStyle : lightStyle} showLineNumbers="true">
              {raw.source.toString()}
            </SyntaxHighlighter>
          </div>
        ]))}
      </section>
    </div>
  );
}

SourceReader.propTypes = {
  componentName: PropTypes.string.isRequired,

  mode: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  mode: state.ui.type
});

const AppMapped = connect(
  mapStateToProps,
)(SourceReader);

export default AppMapped;
