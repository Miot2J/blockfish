import React, { useState } from 'react';
import TextDefault from '../../components/ui/TextDefault';
import { JoinContainer } from '../../styles/Join';
import { Button } from '@material-ui/core';
import DefaultLayout from '../../layouts/DefaultLayout';
import { UserInfoFieldWrapper, UserInfoBottomWrapper, UserInfoInput } from '../../styles/MyPage';
import useInput from '../../hooks/useInput';
import { useStyles } from '../../styles/materialsStyle';
import { regExpPwd, debounce } from '../../utils/utils';
import { useDispatch } from 'react-redux';
import { signupRequestAction } from '../../modules/actions/user';

const JoinForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [email, onChangeEmail] = useInput('');
  const [name, onChangeName] = useInput('');
  const [pwd, setPwd] = useState('');
  const [pwdCheck, handlePwdCheck] = useInput('');
  const [pwdState, setPwdState] = useState(false);

  const onChangePwd = (e) => {
    debounce(() => {
      if (e.target.value.length < 8 || e.target.value.length > 20) {
        alert('영문, 숫자, 특수문자 조합의 8~20자리 입니다.');
        return;
      }
      if (regExpPwd(e.target.value)) {
        setPwdState(true);
      }
    }, 1000);
    setPwd(e.target.value);
  };
  console.log('pwdState', pwdState);
  const onSignup = (e) => {
    alert('dd');
    e.preventDefault();
    dispatch(signupRequestAction({ email, name, pwd }));
  };

  return (
    <DefaultLayout>
      <JoinContainer>
        <TextDefault size="30px" weight="700">
          회원가입
        </TextDefault>
        <span style={{ marginRight: 60, alignSelf: 'flex-end' }}>
          <TextDefault size="14px" color="#FF0000">
            *필수입력사항입니다.
          </TextDefault>
        </span>
        <div>
          <form style={{ marginTop: 40 }} noValidate autoComplete="off" onSubmit={onSignup}>
            <UserInfoFieldWrapper>
              <span style={{ marginRight: 50 }}>
                <TextDefault width="100px" size="16px" color="#000000">
                  <span>이메일</span>
                </TextDefault>
              </span>
              <UserInfoInput
                type="email"
                className={`${classes.userInfoInput}`}
                onChange={onChangeEmail}
              />
              <span style={{ marginLeft: 15 }}>
                <Button className={`${classes.emailChkBtn}`}>중복확인</Button>
              </span>
            </UserInfoFieldWrapper>

            <UserInfoFieldWrapper>
              <span style={{ marginRight: 50 }}>
                <TextDefault width="100px" size="16px" color="#000000">
                  <span>이름</span>
                </TextDefault>
              </span>
              <UserInfoInput className={`${classes.userInfoInput}`} onChange={onChangeName} />
            </UserInfoFieldWrapper>

            <UserInfoFieldWrapper>
              <span style={{ marginRight: 50 }}>
                <TextDefault size="16px" color="#000000">
                  <span>비밀번호</span>
                </TextDefault>
              </span>
              <UserInfoInput
                type="password"
                className={`${classes.userInfoInput}`}
                onChange={onChangePwd}
              />
            </UserInfoFieldWrapper>

            <UserInfoFieldWrapper>
              <span style={{ marginRight: 50 }}>
                <TextDefault size="16px" color="#000000">
                  <span>비밀번호 확인</span>
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
            <UserInfoBottomWrapper>
              <Button type="submit" className={`${classes.joinFormBtn}`}>
                가입하기
              </Button>
            </UserInfoBottomWrapper>
          </form>
        </div>
      </JoinContainer>
    </DefaultLayout>
  );
};

export default JoinForm;
