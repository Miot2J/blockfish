import styled from '@emotion/styled';

export const MyPageContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  margin-top: 70px;
`;
export const MyPageCardContainer = styled.div`
  border: 1px solid #ececec;
  border-radius: 12px;
  box-shadow: 2px 2px 4px 1px rgba(40, 40, 40, 0.3);
  cursor: pointer;
  transition: 0.1s linear;
  &:hover {
    opacity: 0.7;
    border: 1px solid #808080;
    box-shadow: 2px 4px 4px 1px rgba(40, 40, 40, 0.5);
  }
`;
export const MyPageCardWrapper = styled.div`
  text-align: center;
  padding: 30px 0;
`;
// UserInfo
export const UserInfoFieldWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;
export const UserInfoBottomWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 80px auto;
  padding-left: 50px;
`;
export const UserInfoInput = styled.input(() => ({
  minWidth: '400px',
  fontSize: '16px',
  marginLeft: 'auto',
  borderRadius: 5,
  border: '2px solid rgb(205,205,205)',
  padding: '12px 20px',
  transition: '0.1s linear',
  '&:focus': {
    outline: 'none',
    boxShadow: '2px 2px 1px 1px rgb(40, 40, 40, 0.15)',
    borderColor: '#4169e1',
  },
}));

// 마이페이지 - 업로드 화면
export const UploadContainer = styled.div`
  width: 100%;
  max-width: 820px;
  margin: 40px auto;
`;
export const UploadContentItems = styled.ul`
  margin-top: 40px;
`;
export const UploadContentItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

export const UploadInput = styled.input(() => ({
  minWidth: '500px',
  fontSize: '16px',
  borderRadius: 5,
  border: '2px solid rgb(205,205,205)',
  padding: '12px 20px',
  transition: '0.1s linear',
  '&:focus': {
    outline: 'none',
    boxShadow: '2px 2px 1px 1px rgb(40, 40, 40, 0.15)',
    borderColor: '#4169e1',
  },
}));
export const UploadTextarea = styled.textarea(() => ({
  minWidth: '500px',
  fontSize: '16px',
  borderRadius: 5,
  border: '2px solid rgb(205,205,205)',
  padding: '12px 20px',
  transition: '0.1s linear',
  resize: 'none',
  '&:focus': {
    outline: 'none',
    boxShadow: '2px 2px 1px 1px rgb(40, 40, 40, 0.15)',
    borderColor: '#4169e1',
  },
}));
export const UploadBottomWrapper = styled.div`
  text-align: center;
  margin-top: 60px;
`;
