import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { SourceReader, PapperBlock } from 'dan-components';
import ReduxFormDemo from './ReduxFormDemo';

function ReduxForm() {
  const [valueForm, setValueForm] = useState(null);

  const showResult = values => {
    setTimeout(() => {
      setValueForm(JSON.stringify(values));
      console.log(`You submitted:\n\n${valueForm}`); // eslint-disable-line
    }, 500); // simulate server latency
  };

  const title = brand.name + ' - Form';
  const description = brand.desc;
  const docSrc = 'containers/Pages/Forms/';
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
      <PapperBlock title="Redux Form" icon="ion-ios-list-box-outline" desc="This is a simple demonstration of how to connect all the standard material-ui form elements to redux-form.">
        <div>
          <ReduxFormDemo onSubmit={(values) => showResult(values)} />
          <p>Submited Result: </p>
          <code>
            {valueForm && valueForm.toString()}
          </code>
          <SourceReader componentName={docSrc + 'ReduxFormDemo.js'} />
        </div>
      </PapperBlock>
    </div>
  );
}

export default ReduxForm;
