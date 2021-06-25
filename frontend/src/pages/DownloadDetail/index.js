import React, { useEffect } from 'react';
import BreadScrumb from '../../components/downloadDetail/BreadScrumb';
import DownloadDetailLeft from '../../components/downloadDetail/DownloadDetailLeft';
import DownloadDetailRight from '../../components/downloadDetail/DownloadDetailRight';
import { DnldDetailWrapper } from '../../styles/DownloadDetail';

const DownloadDetail = (props) => {
  const { match } = props;

  useEffect(() => {
    // API 호출
    console.log('match.params', match.params.id);
  }, []);

  return (
    <>
      <BreadScrumb />
      <DnldDetailWrapper>
        <DownloadDetailLeft />
        <DownloadDetailRight />
      </DnldDetailWrapper>
    </>
  );
};

export default DownloadDetail;
