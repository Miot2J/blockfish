import React from 'react';
import TextDefault from '../../components/ui/TextDefault';
import { MyPageCardContainer, MyPageCardWrapper, MyPageContainer } from '../../styles/MyPage';
import { ReactComponent as UserCircleSvg } from '../../assets/user-circle-solid.svg';
import { ReactComponent as EditSvg } from '../../assets/edit-solid.svg';
import { ReactComponent as AddressCardSvg } from '../../assets/address-card-regular.svg';
import { ReactComponent as UploadSvg } from '../../assets/cloud-upload-alt-solid.svg';
import { ReactComponent as DownloadSvg } from '../../assets/cloud-download-alt-solid.svg';
import { ReactComponent as FileUploadSvg } from '../../assets/file-upload-solid.svg';
import { Link } from 'react-router-dom';

const MyPage = () => {
  console.log('hello');
  return (
    <>
      <div>
        <TextDefault size="30px" weight="700">
          MyPage
        </TextDefault>
      </div>

      <MyPageContainer>
        <Link to="/my-page/userinfo">
          <MyPageCardContainer>
            <MyPageCardWrapper>
              <div style={{ marginBottom: 10 }}>
                <UserCircleSvg width="50" height="50" fill="#000" />
              </div>
              <TextDefault size="16px" color="#2f4f4f" weight="700">
                개인정보
              </TextDefault>
            </MyPageCardWrapper>
          </MyPageCardContainer>
        </Link>

        <Link to="/my-page/review">
          <MyPageCardContainer>
            <MyPageCardWrapper>
              <div style={{ marginBottom: 10 }}>
                <EditSvg width="50" height="50" fill="#000" />
              </div>
              <TextDefault size="16px" color="#2f4f4f" weight="700">
                리뷰
              </TextDefault>
            </MyPageCardWrapper>
          </MyPageCardContainer>
        </Link>

        <Link to="/my-page/withdrawal">
          <MyPageCardContainer>
            <MyPageCardWrapper>
              <div style={{ marginBottom: 10 }}>
                <AddressCardSvg width="50" height="50" fill="#000" />
              </div>
              <TextDefault size="16px" color="#2f4f4f" weight="700">
                회원탈퇴
              </TextDefault>
            </MyPageCardWrapper>
          </MyPageCardContainer>
        </Link>

        <Link to="/my-page/history/download">
          <MyPageCardContainer>
            <MyPageCardWrapper>
              <div style={{ marginBottom: 10 }}>
                <DownloadSvg width="50" height="50" fill="#000" />
              </div>
              <TextDefault size="16px" color="#2f4f4f" weight="700">
                다운로드 내역
              </TextDefault>
            </MyPageCardWrapper>
          </MyPageCardContainer>
        </Link>

        <Link to="/my-page/history/upload">
          <MyPageCardContainer>
            <MyPageCardWrapper>
              <div style={{ marginBottom: 10 }}>
                <UploadSvg width="50" height="50" fill="#000" />
              </div>
              <TextDefault size="16px" color="#2f4f4f" weight="700">
                업로드 내역
              </TextDefault>
            </MyPageCardWrapper>
          </MyPageCardContainer>
        </Link>

        <Link to="/my-page/upload">
          <MyPageCardContainer>
            <MyPageCardWrapper>
              <div style={{ marginBottom: 10 }}>
                <FileUploadSvg width="50" height="50" fill="#000" />
              </div>
              <TextDefault size="16px" color="#2f4f4f" weight="700">
                업로드
              </TextDefault>
            </MyPageCardWrapper>
          </MyPageCardContainer>
        </Link>
      </MyPageContainer>
    </>
  );
};

export default MyPage;
