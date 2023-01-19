import React from 'react';
import { PropTypes } from 'prop-types';
import { Helmet } from 'react-helmet';
import { makeStyles } from 'tss-react/mui';
import brand from 'dan-api/dummy/brand';
import Typography from '@mui/material/Typography';

import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import MenuContent from 'dan-api/ui/menu';
import { PapperBlock } from 'dan-components';

const useStyles = makeStyles()(() => ({
  link: {
    display: 'block',
    textTransform: 'capitalize',
    marginLeft: 24
  },
  title: {
    margin: '20px 16px 5px',
    textTransform: 'uppercase',
    fontSize: 12,
  }
}));

function Parent(props) {
  const { classes } = useStyles();
  const title = brand.name;
  const description = brand.desc;
  const { history } = props;
  // Get Path Location
  let parts = history.location.pathname.split('/');
  const place = parts[parts.length - 1];
  parts = parts.slice(1, parts.length - 1);
  const menuItems = MenuContent
    .find(obj => (
      obj.key === place
    ));
  const getMenus = menuArray => menuArray.map((item, index) => {
    if (item.link) {
      return (
        <Button
          key={index.toString()}
          color="primary"
          component={Link}
          className={classes.link}
          to={item.link}
        >
          {item.name}
        </Button>
      );
    }
    return (
      <Typography key={index.toString()} className={classes.title} variant="h6">
        { item.name }
      </Typography>
    );
  });

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <PapperBlock title={place} desc="">
        {menuItems !== undefined && getMenus(menuItems.child, 'key')}
      </PapperBlock>
    </div>
  );
}

Parent.propTypes = {

  history: PropTypes.object.isRequired,
};

export default Parent;
