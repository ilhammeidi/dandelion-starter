import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { makeStyles } from 'tss-react/mui';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import Loading from '@mui/material/LinearProgress';
import { useSelector, useDispatch } from 'react-redux';
import { changeModeAction } from 'dan-redux/modules/ui';
import appTheme from '../../styles/theme/applicationTheme';

const useStyles = makeStyles()(() => ({
  root: {
    width: '100%',
    minHeight: '100%',
    marginTop: 0,
    zIndex: 1,
  },
  loading: {
    zIndex: '10 !important',
    position: 'fixed !important',
    top: 0,
    left: 0,
    width: '100%',
    opacity: 1,
    transition: 'opacity .5s ease'
  },
  loadingWrap: {
    background: 'none !important'
  },
  bar: {
    background: 'rgba(255, 255, 255, 0.7) !important'
  },
  hide: {
    opacity: 0
  }
}));

const isBrowser = typeof document !== 'undefined';
let insertionPoint;

if (isBrowser) {
  const emotionInsertionPoint = document.querySelector(
    'meta[name="emotion-insertion-point"]',
  );
  insertionPoint = emotionInsertionPoint ?? undefined;
}

const cacheRTL = createCache({
  key: 'mui-style-rtl',
  stylisPlugins: [prefixer, rtlPlugin],
  insertionPoint,
});

const cacheLTR = createCache({
  key: 'mui-style-ltr',
  insertionPoint,
});

export const ThemeContext = React.createContext(undefined);

function ThemeWrapper(props) {
  const { classes } = useStyles();
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();

  const color = useSelector((state) => state.ui.theme);
  const mode = useSelector((state) => state.ui.type);
  const direction = useSelector((state) => state.ui.direction);

  const [theme, setTheme] = useState(
    appTheme(color, mode, direction)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
        }
        const diff = Math.random() * 40;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleChangeMode = mode => { // eslint-disable-line
    dispatch(changeModeAction(mode));
    setTheme(appTheme(color, mode));
  };

  const muiTheme = createTheme(theme);
  const { children } = props;

  return (
    <CacheProvider value={theme.direction === 'rtl' ? cacheRTL : cacheLTR}>
      <ThemeProvider theme={muiTheme}>
        <div className={classes.root}>
          <Loading
            variant="determinate"
            value={progress}
            className={progress >= 100 ? classes.hide : ''}
            classes={{
              root: classes.loading,
              colorPrimary: classes.loadingWrap,
              barColorPrimary: classes.bar
            }}
          />
          <ThemeContext.Provider value={handleChangeMode}>
            {children}
          </ThemeContext.Provider>
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
}

ThemeWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeWrapper;
