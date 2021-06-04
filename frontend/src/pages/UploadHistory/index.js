import { Button, FormControlLabel, FormGroup } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import CheckedListCardTemplate from '../../components/cards/CheckedListCardTemplate';
import PagingContainer from '../../components/pagination/PagingContainer';
import CheckboxDefault from '../../components/ui/CheckboxDefault';
import useInputPage from '../../hooks/useInputPage';
import DefaultLayout from '../../layouts/DefaultLayout';
import MyPageLayout from '../../layouts/MyPageLayout';
import { isEmpty } from '../../utils/utils';
import { useStyles } from '../../styles/materialsStyle';
import { useHistory } from 'react-router';

const UploadHistory = () => {
  const classes = useStyles();
  const history = useHistory();
  const [fileList, setFileList] = useState([]);
  const [page, onhandleChangePage] = useInputPage(1);
  const [wholeChecked, setWholeChecked] = useState(false);

  const onChangeWholeChecked = () => {
    const isChecked = !wholeChecked;
    const list = fileList.map((data) => ({ ...data, checked: isChecked }));
    setFileList(list);
    setWholeChecked(isChecked);
  };

  const onChangeChecked = (id) => {
    if (isEmpty(id)) return;
    const list = fileList.map((data) => {
      if (id === data.id) {
        return { ...data, checked: !data.checked };
      }
      return { ...data };
    });
    setFileList(list);
  };

  useEffect(() => {
    setFileList([
      {
        id: 1,
        title: 'Zoom Cloud Meetings',
        description: '수많은 기능을 이용해 영상 통화와 미팅을 해보세요',
        rating: 4.5,
        commentNum: 40,
        imgSrc: '/images/card/empty.png',
        checked: false,
      },
      {
        id: 2,
        title: 'Zoom Cloud Meetings',
        description: '메롱',
        rating: 3.5,
        commentNum: 30,
        imgSrc: '/images/card/empty.png',
        checked: false,
      },
      {
        id: 3,
        title: 'Zoom Cloud Meetings',
        description: '메롱',
        rating: 2.5,
        commentNum: 30,
        imgSrc: '/images/card/empty.png',
        checked: false,
      },
      {
        id: 4,
        title: 'Zoom Cloud Meetings',
        description: '수많은 기능을 이용해 영상 통화와 미팅을 해보세요',
        rating: 4.5,
        commentNum: 40,
        imgSrc: '/images/card/empty.png',
        checked: false,
      },
      {
        id: 5,
        title: 'Zoom Cloud Meetings',
        description: '메롱',
        rating: 3.5,
        commentNum: 30,
        imgSrc: '/images/card/empty.png',
        checked: false,
      },
      {
        id: 6,
        title: 'Zoom Cloud Meetings',
        description: '메롱',
        rating: 2.5,
        commentNum: 30,
        imgSrc: '/images/card/empty.png',
        checked: false,
      },
      {
        id: 7,
        title: 'Zoom Cloud Meetings',
        description: '수많은 기능을 이용해 영상 통화와 미팅을 해보세요',
        rating: 4.5,
        commentNum: 40,
        imgSrc: '/images/card/empty.png',
        checked: false,
      },
      {
        id: 8,
        title: 'Zoom Cloud Meetings',
        description: '메롱',
        rating: 3.5,
        commentNum: 30,
        imgSrc: '/images/card/empty.png',
        checked: false,
      },
      {
        id: 9,
        title: 'Zoom Cloud Meetings',
        description: '메롱',
        rating: 2.5,
        commentNum: 30,
        imgSrc: '/images/card/empty.png',
        checked: false,
      },
    ]);
  }, []);

  return (
    <DefaultLayout>
      <MyPageLayout title="업로드 내역" viewState={4}>
        <div style={{ marginTop: 20 }}>
          <div style={{ marginLeft: 25 }}>
            <FormGroup row>
              <FormControlLabel
                control={<CheckboxDefault checked={wholeChecked} onChange={onChangeWholeChecked} />}
                label={wholeChecked ? '전체 해제' : '전체 선택'}
              />
            </FormGroup>
          </div>

          {!isEmpty(fileList) &&
            fileList.map((data) => (
              <CheckedListCardTemplate
                key={data.id}
                content={data}
                onChangeChecked={onChangeChecked}
              />
            ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
          <Button
            className={`${classes.uploadBtn}`}
            onClick={() => {
              history.push('/my-page/upload');
            }}
          >
            업로드
          </Button>
        </div>

        {/* 페이징 - 시작 */}
        <PagingContainer whlPage={5} page={page} handleChangePage={onhandleChangePage} />
        {/* 페이징 - 끝 */}
      </MyPageLayout>
    </DefaultLayout>
  );
};

export default UploadHistory;
