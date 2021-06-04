import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GridCardTemplate from '../../components/cards/GridCardTemplate';
import ListCardTemplate from '../../components/cards/ListCardTemplate';
import ListGubunBar from '../../components/download/ListGubunBar';
import PagingContainer from '../../components/pagination/PagingContainer';
import useInputPage from '../../hooks/useInputPage';
import DefaultLayout from '../../layouts/DefaultLayout';
import MyPageLayout from '../../layouts/MyPageLayout';
import { getListStart } from '../../modules/actions/list';
import { GridLayoutWrapper } from '../../styles/Download';
import { isEmpty } from '../../utils/utils';

const DownloadHistory = () => {
  const [fileList, setFileList] = useState([]);
  const [viewState, setViewState] = useState(false);
  const [page, onhandleChangePage] = useInputPage(1);
  const { list } = useSelector((state) => ({
    list: state.fetchData.list,
  }));
  const dispatch = useDispatch();
  const onToggleView = (s) => {
    if (s) {
      setViewState(true);
    } else {
      setViewState(false);
    }
  };

  useEffect(() => {
    setViewState(false);
    setFileList([
      {
        id: 1,
        title: 'Zoom Cloud Meetings',
        descption: '수많은 기능을 이용해 영상 통화와 미팅을 해보세요',
        rating: 4.5,
        commentNum: 40,
        imgSrc: '/images/card/empty.png',
      },
      {
        id: 2,
        title: 'Zoom Cloud Meetings',
        descption: '메롱',
        rating: 3.5,
        commentNum: 30,
        imgSrc: '/images/card/empty.png',
      },
      {
        id: 3,
        title: 'Zoom Cloud Meetings',
        descption: '메롱',
        rating: 2.5,
        commentNum: 30,
        imgSrc: '/images/card/empty.png',
      },
      {
        id: 4,
        title: 'Zoom Cloud Meetings',
        descption: '수많은 기능을 이용해 영상 통화와 미팅을 해보세요',
        rating: 4.5,
        commentNum: 40,
        imgSrc: '/images/card/empty.png',
      },
      {
        id: 5,
        title: 'Zoom Cloud Meetings',
        descption: '메롱',
        rating: 3.5,
        commentNum: 30,
        imgSrc: '/images/card/empty.png',
      },
      {
        id: 6,
        title: 'Zoom Cloud Meetings',
        descption: '메롱',
        rating: 2.5,
        commentNum: 30,
        imgSrc: '/images/card/empty.png',
      },
      {
        id: 7,
        title: 'Zoom Cloud Meetings',
        descption: '수많은 기능을 이용해 영상 통화와 미팅을 해보세요',
        rating: 4.5,
        commentNum: 40,
        imgSrc: '/images/card/empty.png',
      },
      {
        id: 8,
        title: 'Zoom Cloud Meetings',
        descption: '메롱',
        rating: 3.5,
        commentNum: 30,
        imgSrc: '/images/card/empty.png',
      },
      {
        id: 9,
        title: 'Zoom Cloud Meetings',
        descption: '메롱',
        rating: 2.5,
        commentNum: 30,
        imgSrc: '/images/card/empty.png',
      },
    ]);

    // api 호출 시작
    dispatch(getListStart());
  }, []);

  console.log('list', list);

  return (
    <DefaultLayout>
      <MyPageLayout title="다운로드 내역" viewState={3}>
        <ListGubunBar onToggleView={onToggleView} />
        <div style={{ marginTop: 20 }}>
          {!isEmpty(fileList) &&
            (viewState ? (
              fileList.map((data) => <ListCardTemplate key={data.id} content={data} />)
            ) : (
              <GridLayoutWrapper>
                {fileList.map((data) => (
                  <GridCardTemplate key={data.id} content={data} />
                ))}
              </GridLayoutWrapper>
            ))}
        </div>

        {/* 페이징 - 시작 */}
        <PagingContainer whlPage={5} page={page} handleChangePage={onhandleChangePage} />
        {/* 페이징 - 끝 */}
      </MyPageLayout>
    </DefaultLayout>
  );
};

export default DownloadHistory;
