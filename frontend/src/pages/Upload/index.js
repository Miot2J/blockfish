import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Button } from '@material-ui/core';

import DefaultLayout from '../../layouts/DefaultLayout';
import MyPageLayout from '../../layouts/MyPageLayout';
import TextDefault from '../../components/ui/TextDefault';
import {
  UploadContainer,
  UploadContentItems,
  UploadContentItem,
  UploadInput,
  UploadBottomWrapper,
} from '../../styles/MyPage';
import useInput from '../../hooks/useInput';
import { useStyles } from '../../styles/materialsStyle';
import SelectDefault from '../../components/ui/SelectDefault';
import CheckboxWithLabel from '../../components/ui/CheckboxWithLabel';
import QuillEditor from '../../components/editor/QuillEditor';
import { isEmpty } from '../../utils/utils';
import { useDispatch } from 'react-redux';
import { reqImage } from '../../modules/actions/uploadImage';

const Upload = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [filename, onChangeFilename] = useInput('');
  const [fileImage, onChangefileImage] = useInput('');
  const [checked, setChecked] = useState({
    window: false,
    mac: false,
    android: false,
    ios: false,
    paid: false,
    free: false,
  });
  const [largeMenu, setLargeMenu] = useState('');
  const [smallMenu, setSmallMenu] = useState('');

  const defaultString = 'Hello, This is CKEditor~~';
  const [content, setContent] = useState(defaultString);

  // 더미데이터
  const largeMenuList = [
    { id: 0, name: '대분류1' },
    { id: 1, name: '대분류2' },
    { id: 2, name: '대분류3' },
  ];
  const smallMenuList = [
    { id: 0, name: '소분류1' },
    { id: 1, name: '소분류2' },
    { id: 2, name: '소분류3' },
  ];

  const onChangeChecked = (e) => {
    setChecked({ ...checked, [e.target.name]: e.target.checked });
  };

  const onChangeLargeMenu = (e) => {
    setLargeMenu(e.target.value);
  };
  const onChangeSmallMenu = (e) => {
    setSmallMenu(e.target.value);
  };

  const onClickUpload = () => {
    if (isEmpty(fileImage)) {
      alert('파일 이미지파일을 첨부해주세요.');
    }
    const formData = new FormData();
    formData.append('image', fileImage);

    dispatch(reqImage(formData));
  };

  return (
    <DefaultLayout>
      <MyPageLayout title="업로드" viewState={5}>
        {/* 업로드 화면 레이아웃 - 시작 */}
        <UploadContainer>
          <UploadContentItems>
            {/* 카테고리 - 시작 */}
            <UploadContentItem>
              <TextDefault size="16px" color="#000" width="150px">
                카테고리
              </TextDefault>

              <SelectDefault
                value={largeMenu}
                menuItems={largeMenuList}
                selectName="대분류"
                onChangeMenu={onChangeLargeMenu}
              />

              <SelectDefault
                value={smallMenu}
                menuItems={smallMenuList}
                selectName="소분류"
                onChangeMenu={onChangeSmallMenu}
              />
            </UploadContentItem>
            {/* 카테고리 - 끝 */}

            {/* 파일명 - 시작 */}
            <UploadContentItem>
              <TextDefault size="16px" color="#000" width="150px">
                파일명
              </TextDefault>
              <UploadInput type="text" value={filename} onChange={onChangeFilename} />
            </UploadContentItem>
            {/* 파일명 - 끝 */}

            {/* 파일선택 - 시작 */}
            <UploadContentItem>
              <TextDefault size="16px" color="#000" width="150px">
                파일
              </TextDefault>
              <UploadInput type="text" value={filename} onChange={onChangeFilename} />
              <Button className={`${classes.fileSelctionBtn}`} style={{ marginLeft: '10px' }}>
                파일선택
              </Button>
            </UploadContentItem>
            {/* 파일선택 - 끝 */}

            {/* 파일이미지 - 시작 */}
            <UploadContentItem>
              <TextDefault size="16px" color="#000" width="150px">
                파일 이미지
              </TextDefault>
              <UploadInput type="file" value={fileImage} onChange={onChangefileImage} />
              <Button className={`${classes.fileSelctionBtn}`} style={{ marginLeft: '10px' }}>
                이미지선택
              </Button>
            </UploadContentItem>
            {/* 파일이미지 - 끝 */}

            {/* OS - 시작 */}
            <UploadContentItem>
              <TextDefault size="16px" color="#000" width="150px">
                OS
              </TextDefault>

              <CheckboxWithLabel
                checked={checked.window}
                onChangeChecked={onChangeChecked}
                name="window"
                label="Window"
              />
              <CheckboxWithLabel
                checked={checked.mac}
                onChangeChecked={onChangeChecked}
                name="mac"
                label="Mac"
              />
              <CheckboxWithLabel
                checked={checked.android}
                onChangeChecked={onChangeChecked}
                name="android"
                label="Android"
              />
              <CheckboxWithLabel
                checked={checked.ios}
                onChangeChecked={onChangeChecked}
                name="ios"
                label="iOS"
              />
            </UploadContentItem>
            {/* OS - 끝 */}

            {/* 가격 - 시작 */}
            <UploadContentItem>
              <TextDefault size="16px" color="#000" width="150px">
                가격
              </TextDefault>

              <CheckboxWithLabel
                checked={checked.free}
                onChangeChecked={onChangeChecked}
                name="free"
                label="Free"
              />
              <CheckboxWithLabel
                checked={checked.paid}
                onChangeChecked={onChangeChecked}
                name="paid"
                label="Paid"
              />
            </UploadContentItem>
            {/* 가격 - 끝 */}

            {/* 설명 - 시작 */}
            {/* <UploadContentItem>
              <TextDefault size="16px" color="#000" width="150px">
                설명
              </TextDefault>
              <UploadTextarea type="text" value={filename} onChange={onChangeFilename} />
            </UploadContentItem> */}
            {/* 설명 - 끝 */}
          </UploadContentItems>

          <div style={{ marginBottom: 15 }}>
            <TextDefault size="16px" color="#000" width="150px">
              설명
            </TextDefault>
          </div>
          <QuillEditor
            value={content}
            onChange={(value) => {
              setContent(value);
            }}
          />

          {/* 하단 버튼 Wrapper - 시작 */}
          <UploadBottomWrapper>
            <Button className={`${classes.userInfoUpdateBtn}`} onClick={onClickUpload}>
              업로드
            </Button>
            <Button
              className={`${classes.userInfoCancelBtn}`}
              onClick={() => {
                history.push('/my-page');
              }}
            >
              취소
            </Button>
          </UploadBottomWrapper>
          {/* 하단 버튼 Wrapper - 끝 */}
        </UploadContainer>
        {/* 업로드 화면 레이아웃 - 끝 */}
      </MyPageLayout>
    </DefaultLayout>
  );
};

export default Upload;
