import React, { useState } from 'react';
import TextDefault from '../../components/ui/TextDefault';
import { Button } from '@material-ui/core';
import DefaultLayout from '../../layouts/DefaultLayout';
import { UserInfoFieldWrapper, UserInfoBottomWrapper, UserInfoInput } from '../../styles/MyPage';
import { useStyles } from '../../styles/materialsStyle';
import MyPageLayout from '../../layouts/MyPageLayout';
import { regExpPwd } from '../../utils/utils';
import useInput from '../../hooks/useInput';

const UserInfo = () => {
  const classes = useStyles();
  const [id, handleId] = useInput('');
  const [name, handleName] = useInput('');
  const [pwd, setPwd] = useState('');
  const [pwdCheck, handlePwdCheck] = useInput('');
  const [pwdState, setPwdState] = useState(false);

  const onChangePwd = (e) => {
    if (e.target.value.length > 20) {
      alert('길이가 너무 깁니다.');
      return;
    }
    if (regExpPwd(e.target.value)) {
      setPwdState(true);
    }

    setPwd(e.target.value);
  };
  console.log('pwdState', pwdState);
  return (
    <DefaultLayout>
      <MyPageLayout title="개인정보" viewState={0}>
        <div>
          <form style={{ marginTop: 40 }} noValidate autoComplete="off">
            <UserInfoFieldWrapper>
              <span style={{ width: 200 }}>
                <TextDefault size="16px" color="#000000">
                  아이디(이메일)
                </TextDefault>
              </span>
              <UserInfoInput
                type="email"
                className={`${classes.userInfoInput}`}
                value={id}
                onChange={handleId}
              />
            </UserInfoFieldWrapper>

            <UserInfoFieldWrapper>
              <span style={{ width: 200 }}>
                <TextDefault size="16px" color="#000000">
                  이름
                </TextDefault>
              </span>
              <UserInfoInput
                className={`${classes.userInfoInput}`}
                value={name}
                onChange={handleName}
              />
            </UserInfoFieldWrapper>

            <UserInfoFieldWrapper>
              <span style={{ width: 200 }}>
                <TextDefault size="16px" color="#000000">
                  비밀번호
                </TextDefault>
              </span>
              <UserInfoInput
                type="password"
                className={`${classes.userInfoInput}`}
                value={pwd}
                onChange={onChangePwd}
              />
              <span style={{ marginLeft: 15 }}>
                <TextDefault size="14px" color="#808080">
                  {setPwdState ? '적합합니다.' : '영문, 숫자, 특수문자 조합의 8~20자리 입니다.'}
                </TextDefault>
              </span>
            </UserInfoFieldWrapper>

            <UserInfoFieldWrapper>
              <span style={{ width: 200 }}>
                <TextDefault size="16px" color="#000000">
                  비밀번호 확인
                </TextDefault>
              </span>
              <UserInfoInput
                type="password"
                className={`${classes.userInfoInput}`}
                value={pwdCheck}
                onChange={handlePwdCheck}
              />

              <span style={{ marginLeft: 15 }}>
                <TextDefault size="14px" color="#808080">
                  확인을 위해 한번 더 입력해주세요.
                </TextDefault>
              </span>
            </UserInfoFieldWrapper>
          </form>
        </div>

        <UserInfoBottomWrapper>
          <Button className={`${classes.userInfoUpdateBtn}`}>수정</Button>
          <Button className={`${classes.userInfoCancelBtn}`}>취소</Button>
        </UserInfoBottomWrapper>
      </MyPageLayout>
    </DefaultLayout>
  );
};

export default UserInfo;
