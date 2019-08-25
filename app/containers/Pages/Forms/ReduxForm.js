import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { withStyles } from '@material-ui/core/styles';
import { SourceReader, PapperBlock } from 'dan-components';
import ReduxFormDemo from './ReduxFormDemo';

const styles = ({
  root: {
    flexGrow: 1,
  }
});

class ReduxForm extends React.Component {
  state = {
    valueForm: []
  }

  showResult(values) {
    setTimeout(() => {
      this.setState({ valueForm: values });
      window.alert(`You submitted:\n\n${this.state.valueForm}`); // eslint-disable-line
    }, 500); // simulate server latency
  }

  render() {
    const title = brand.name + ' - Form';
    const description = brand.desc;
    const docSrc = 'containers/Forms/demos/';
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
        <PapperBlock title="Redux Form" icon="ios-list-box-outline" desc="This is a simple demonstration of how to connect all the standard material-ui form elements to redux-form.">
          <div>
            <ReduxFormDemo onSubmit={(values) => this.showResult(values)} />
            <SourceReader componentName={docSrc + 'ReduxFormDemo.js'} />
          </div>
        </PapperBlock>
      </div>
    );
  }
}

export default withStyles(styles)(ReduxForm);
