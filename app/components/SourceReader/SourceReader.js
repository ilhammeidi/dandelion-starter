import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Axios from 'axios';
import { connect } from 'react-redux';
import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/prism-light';
import jsx from 'react-syntax-highlighter/languages/prism/jsx';
import lightStyle from 'react-syntax-highlighter/styles/prism/prism';
import darkStyle from 'react-syntax-highlighter/styles/prism/xonokai';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import LinearProgress from '@material-ui/core/LinearProgress';
import Code from '@material-ui/icons/Code';
import Close from '@material-ui/icons/Close';
import Icon from '@material-ui/core/Icon';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import codePreview from '../../config/codePreview';

const url = '/api/docs?src=';

const styles = theme => ({
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
    minHeight: 50,
  },
  src: {
    textAlign: 'left',
    padding: 10,
    position: 'absolute',
    top: 10,
    left: 0,
    zIndex: 1,
    fontFamily: 'monospace',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    marginTop: theme.spacing(3)
  },
});

function SourceReader(props) {
  const [raws, setRaws] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [style, setStyle] = useState(props.mode);

  const sourceOpen = () => {
    const { componentName } = props;
    const name = componentName;
    setLoading(true);
    Axios.get(url + name).then(result => {
      setRaws(result.data.records);
      setLoading(false);
    });
    setOpen(!open);
  };

  const handleStyle = (event, value) => {
    setStyle(value);
  };

  const { classes, componentName } = props;
  registerLanguage('jsx', jsx);
  if (codePreview.enable) {
    return (
      <div>
        <Button onClick={sourceOpen} color="secondary" className={classes.button} size="small">
          { open ? (
            <Close className={classNames(classes.leftIcon, classes.iconSmall)} />
          ) : (
            <Code className={classNames(classes.leftIcon, classes.iconSmall)} />
          )}
          { open ? 'Hide Code' : 'Show Code' }
        </Button>
        <section className={classNames(classes.source, open ? classes.open : '')}>
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
  return false;
}

SourceReader.propTypes = {
  componentName: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired,
};

const reducer = 'ui';
const mapStateToProps = state => ({
  mode: state.getIn([reducer, 'type']),
});

const AppMapped = connect(
  mapStateToProps,
)(SourceReader);

export default withStyles(styles)(AppMapped);
