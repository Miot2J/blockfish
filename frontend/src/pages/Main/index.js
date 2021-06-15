import React from 'react';
import DefaultLayout from '../../layouts/DefaultLayout';
import Header from '../../components/header/Header';
import DownloadMain from '../../components/download/DownloadMain';

const Main = () => (
  <DefaultLayout>
    <Header />
    <DownloadMain />
  </DefaultLayout>
);

export default Main;
