import React, { useEffect, useState } from 'react';
import { GridLayoutWrapper } from '../../styles/Download';
import { isEmpty } from '../../utils/utils';
import DownloadCard from '../cards/DownloadCard';
import TextDefault from '../ui/TextDefault';

const DownloadMain = () => {
  const [fileList, setFileList] = useState([]);
  // const [viewState, setViewState] = useState(false);

  // const onToggleView = (s) => {
  //   if (s) {
  //     setViewState(true);
  //   } else {
  //     setViewState(false);
  //   }
  // };

  useEffect(() => {
    setFileList([
      {
        id: 1,
        title: 'Zoom Cloud Meetings',
        descption:
          'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.',
        rating: 4.5,
        commentNum: 40,
        imgSrc:
          'https://preview.colorlib.com/theme/magdesign/images/ximg_2.jpg.pagespeed.ic.fbbBEgB1Q6.webp',
        category: '유틸리티',
        os: 'android',
      },
      {
        id: 2,
        title: 'Zoom Cloud Meetings',
        descption: '메롱',
        rating: 3.5,
        commentNum: 30,
        imgSrc:
          'https://preview.colorlib.com/theme/magdesign/images/ximg_2.jpg.pagespeed.ic.fbbBEgB1Q6.webp',
        category: '유틸리티',
        os: 'ios',
      },
      {
        id: 3,
        title: 'Zoom Cloud Meetings',
        descption: '메롱',
        rating: 2.5,
        commentNum: 30,
        imgSrc:
          'https://preview.colorlib.com/theme/magdesign/images/ximg_2.jpg.pagespeed.ic.fbbBEgB1Q6.webp',
        category: '유틸리티',
        os: 'mac',
      },
      {
        id: 4,
        title: 'Zoom Cloud Meetings',
        descption: '수많은 기능을 이용해 영상 통화와 미팅을 해보세요',
        rating: 4.5,
        commentNum: 40,
        imgSrc: '/images/card/empty.png',
        category: '유틸리티',
        os: 'window',
      },
      {
        id: 5,
        title: 'Zoom Cloud Meetings',
        descption: '메롱',
        rating: 3.5,
        commentNum: 30,
        imgSrc: '/images/card/empty.png',
        category: '유틸리티',
        os: 'android',
      },
      {
        id: 6,
        title: 'Zoom Cloud Meetings',
        descption: '메롱',
        rating: 2.5,
        commentNum: 30,
        imgSrc: '/images/card/empty.png',
        category: '유틸리티',
        os: 'ios',
      },
    ]);
  }, []);

  return (
    <>
      <div>
        <TextDefault size="25px" weight="700">
          최신
        </TextDefault>

        {/* <SortingBarMain onToggleView={onToggleView} /> */}

        <div style={{ marginTop: 20 }}>
          {!isEmpty(fileList) && (
            <GridLayoutWrapper>
              {fileList.map((data) => (
                <DownloadCard key={data.id} content={data} />
              ))}
            </GridLayoutWrapper>
          )}
        </div>
      </div>
      <div style={{ marginTop: 80 }}>
        <TextDefault size="25px" weight="700">
          인기
        </TextDefault>
        <div style={{ marginTop: 20 }}>
          {!isEmpty(fileList) && (
            <GridLayoutWrapper>
              {fileList.map((data) => (
                <DownloadCard key={data.id} content={data} />
              ))}
            </GridLayoutWrapper>
          )}
        </div>
      </div>
    </>
  );
};

export default DownloadMain;
