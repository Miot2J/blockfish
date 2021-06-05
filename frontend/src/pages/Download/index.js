import React from 'react';
// import DownloadLeft from '../../components/download/DownloadLeft';
import DownloadRight from '../../components/download/DownloadRight';
import DefaultLayout from '../../layouts/DefaultLayout';
import { DownloadContainer } from '../../styles/Download';

const Download = () => (
  <DefaultLayout>
    <DownloadContainer>
      {/* <DownloadLeft /> */}
      <DownloadRight />
    </DownloadContainer>
  </DefaultLayout>
);

export default Download;
