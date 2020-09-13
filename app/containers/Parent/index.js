import React from 'react';
import { PropTypes } from 'prop-types';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import MenuContent from 'dan-api/ui/menu';
import { PapperBlock } from 'dan-components';

const styles = {
  link: {
    display: 'block',
    textTransform: 'capitalize'
  },
  title: {
    margin: '20px 16px 5px',
    textTransform: 'uppercase',
    fontSize: 12,
  }
};

function Parent(props) {
  const title = brand.name;
  const description = brand.desc;
  const { classes, history } = props;
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
      <Typography className={classes.title} variant="h6">
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
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withStyles(styles)(Parent);
