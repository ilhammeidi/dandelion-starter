import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock, EmptyData } from 'dan-components';
import StrippedTable from './StrippedTable';

function BasicTable() {
  const title = brand.name + ' - Table';
  const description = brand.desc;
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
      <PapperBlock title="Table" whiteBg icon="ion-ios-menu-outline" desc="UI Table when no data to be shown">
        <div>
          <StrippedTable />
        </div>
      </PapperBlock>
      <PapperBlock title="Empty Table" whiteBg icon="ion-ios-square-outline" desc="They (allegedly) aid usability in reading tabular data by offering the user a coloured means of separating and differentiating rows from one another">
        <div>
          <EmptyData />
        </div>
      </PapperBlock>
    </div>
  );
}

export default BasicTable;
