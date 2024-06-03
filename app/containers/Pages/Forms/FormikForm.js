import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { SourceReader, PapperBlock } from 'dan-components';
import FormikFormDemo from './FormikFormDemo';

function ReduxForm() {
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
      <PapperBlock title="Formik Form" icon="ion-ios-list-box-outline" desc="This is a simple demonstration of how to connect all the standard material-ui form elements to redux-form.">
        <div>
          <FormikFormDemo />
          <SourceReader componentName={docSrc + 'FormikFormDemo.js'} />
        </div>
      </PapperBlock>
    </div>
  );
}

export default ReduxForm;
