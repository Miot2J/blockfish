import React, { useState } from 'react';
import TextDefault from '../../components/ui/TextDefault';
import { JoinContainer } from '../../styles/Join';
import { Button } from '@material-ui/core';
import DefaultLayout from '../../layouts/DefaultLayout';
import { UserInfoFieldWrapper, UserInfoBottomWrapper, UserInfoInput } from '../../styles/MyPage';
import useInput from '../../hooks/useInput';
import { useStyles } from '../../styles/materialsStyle';
import { regExpPwd, debounce } from '../../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { signupRequestAction, emailduplicateRequestAction } from '../../modules/actions/user';
import { useHistory } from 'react-router-dom';

const JoinForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [email, onChangeEmail] = useInput('');
  const [name, onChangeName] = useInput('');
  const [password, setPassword] = useState('');
  const [pwdState, setPwdState] = useState(false);
  const [pwdCheck, setPwdCheck] = useState(false);
  const [error, setError] = useState('');
  const { emailDuplicate } = useSelector((state) => ({
    emailDuplicate: state.user.emailDuplicate,
  }));

  const history = useHistory();

  const onCheckEmail = (e) => {
    const result = e.target.value;
    e.preventDefault();
    dispatch(emailduplicateRequestAction({ result }));
  };

  const onChangePwd = (e) => {
    debounce(() => {
      if (e.target.value.length === 0) {
        return;
      }
      if (e.target.value.length < 8 || e.target.value.length > 20) {
        setError('영문, 숫자, 특수문자 조합의 8~20자리 입니다.');
        return;
      }
      if (regExpPwd(e.target.value)) {
        setError('비밀번호 조건 충족');
        setPwdState(true);
      }
    }, 1000);
    setPassword(e.target.value);
  };

  const onCheckPwd = (e) => {
    const currentPwd = e.target.value;
    if (currentPwd === password) {
      setPwdCheck(!pwdCheck);
    }
  };

  const onSignup = (e) => {
    e.preventDefault();
    if (!emailDuplicate) {
      alert('이메일 중복확인을 해주세요.');
      return;
    }
    if (pwdState) {
      const userId = email;
      dispatch(signupRequestAction({ userId, email, name, password, history }));
    }
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
              <span style={{ width: 130 }}>
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
                {emailDuplicate ? '사용 가능' : '사용 불가능'}
                <Button className={`${classes.emailChkBtn}`} onClick={onCheckEmail}>
                  중복확인
                </Button>
              </span>
            </UserInfoFieldWrapper>

            <UserInfoFieldWrapper>
              <span style={{ width: 130 }}>
                <TextDefault width="100px" size="16px" color="#000000">
                  <span>이름</span>
                </TextDefault>
              </span>
              <UserInfoInput className={`${classes.userInfoInput}`} onChange={onChangeName} />
            </UserInfoFieldWrapper>

            <UserInfoFieldWrapper>
              <span style={{ width: 130 }}>
                <TextDefault size="16px" color="#000000">
                  <span>비밀번호</span>
                </TextDefault>
              </span>
              <UserInfoInput
                type="password"
                className={`${classes.userInfoInput}`}
                onChange={onChangePwd}
              />
              {error && (
                <span style={{ marginLeft: 5 }}>
                  <TextDefault size="14px" color="#000080">
                    {error}
                  </TextDefault>
                </span>
              )}
            </UserInfoFieldWrapper>

            <UserInfoFieldWrapper>
              <span style={{ width: 130 }}>
                <TextDefault size="16px" color="#000000">
                  <span>비밀번호 확인</span>
                </TextDefault>
              </span>
              <UserInfoInput
                type="password"
                className={`${classes.userInfoInput}`}
                onChange={onCheckPwd}
              />
              <span style={{ marginLeft: 5 }}>
                <TextDefault size="14px" color="#808080">
                  {pwdCheck ? '비밀번호 일치' : '비밀번호 불일치'}
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
