import React, { useEffect, useState } from 'react';
import useInputPage from '../../hooks/useInputPage';
import { GridLayoutWrapper, RightLayout } from '../../styles/Download';
import { isEmpty } from '../../utils/utils';
import DownloadCard from '../cards/DownloadCard';
// import ListCardTemplate from '../cards/ListCardTemplate';
import PagingContainer from '../pagination/PagingContainer';
import SlickSlider from '../slider/SlickSlider';
import TextDefault from '../ui/TextDefault';
import DownloadControll from './DownloadControll';
import SortingBar from './SortingBar';

const DownloadRight = () => {
  const [fileList, setFileList] = useState([]);
  // const [viewState, setViewState] = useState(false);
  const [page, onhandleChangePage] = useInputPage(1);
  // const onToggleView = (s) => {
  //   if (s) {
  //     setViewState(true);
  //   } else {
  //     setViewState(false);
  //   }
  // };

  useEffect(() => {
    // setViewState(false);
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
      {
        id: 7,
        title: 'Zoom Cloud Meetings',
        descption: '수많은 기능을 이용해 영상 통화와 미팅을 해보세요',
        rating: 4.5,
        commentNum: 40,
        imgSrc: '/images/card/empty.png',
        category: '유틸리티',
        os: 'mac',
      },
      {
        id: 8,
        title: 'Zoom Cloud Meetings',
        descption: '메롱',
        rating: 3.5,
        commentNum: 30,
        imgSrc: '/images/card/empty.png',
        category: '유틸리티',
        os: 'window',
      },
      {
        id: 9,
        title: 'Zoom Cloud Meetings',
        descption: '메롱',
        rating: 2.5,
        commentNum: 30,
        imgSrc: '/images/card/empty.png',
        category: '유틸리티',
        os: 'android',
      },
    ]);
  }, []);

  return (
    <RightLayout>
      <TextDefault size="20px" weight="700">
        추천
      </TextDefault>

      <SlickSlider />

      <div style={{ marginTop: 20 }}>
        <DownloadControll />
      </div>

      <SortingBar />

      {/* <SortingBar onToggleView={onToggleView} /> */}
      <div style={{ marginTop: 20 }}>
        {/* {!isEmpty(fileList) &&
          (viewState ? (
            fileList.map((data) => <ListCardTemplate key={data.id} content={data} />)
          ) : (
            <GridLayoutWrapper>
              {fileList.map((data) => (
                <GridCardTemplate key={data.id} content={data} />
              ))}
            </GridLayoutWrapper>
          ))} */}

        {!isEmpty(fileList) && (
          <GridLayoutWrapper>
            {fileList.map((data) => (
              <DownloadCard key={data.id} content={data} />
            ))}
          </GridLayoutWrapper>
        )}
      </div>

      {/* 페이징 - 시작 */}
      <PagingContainer whlPage={5} page={page} handleChangePage={onhandleChangePage} />
      {/* 페이징 - 끝 */}
    </RightLayout>
  );
};

export default DownloadRight;
