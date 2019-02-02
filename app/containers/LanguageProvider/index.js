/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { IntlProvider } from 'react-intl';

import { makeSelectLocale } from './selectors';

export class LanguageProvider extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { locale, messages, children } = this.props;
    return (
      <IntlProvider
        locale={locale}
        key={locale}
        messages={messages[locale]}
      >
        {React.Children.only(children)}
      </IntlProvider>
    );
  }
}

LanguageProvider.propTypes = {
  locale: PropTypes.string.isRequired,
  messages: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
};

const mapStateToProps = createSelector(makeSelectLocale(), locale => ({
  locale,
}));

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LanguageProvider);
