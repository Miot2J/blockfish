import React from 'react';
import {
  Checkbox,
  InputAdornment,
  TextField,
  FormControlLabel,
  FormGroup,
} from '@material-ui/core';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

import DefaultLayout from '../../layouts/DefaultLayout';
import TextDefault from '../../components/ui/TextDefault';
import { LoginContainer, LoginWrapper } from '../../styles/Login';

import { useDispatch } from 'react-redux';
import { loginRequestAction } from '../../modules/actions/user';
import useInput from '../../hooks/useInput';
import { useHistory } from 'react-router-dom';

/**
 * @function Login
 * @author Seorim
 * @description 로그인 화면
 */
const Login = () => {
  const dispatch = useDispatch();
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const history = useHistory();

  const onSubmitForm = (event) => {
    event.preventDefault();
    const userId = email;
    const name = email;
    dispatch(loginRequestAction({ userId, password, name, email, history }));
  };

  return (
    <DefaultLayout>
      <LoginContainer>
        <TextDefault size="30px" weight="700">
          로그인
        </TextDefault>
        <LoginWrapper onSubmit={onSubmitForm}>
          <TextField
            label="이메일"
            type="email"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PermIdentityOutlinedIcon />
                </InputAdornment>
              ),
            }}
            style={{ marginTop: '10px' }}
            onChange={onChangeEmail}
          />
          <TextField
            label="비밀번호"
            type="password"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon />
                </InputAdornment>
              ),
            }}
            style={{ marginTop: '10px' }}
            onChange={onChangePassword}
          />
          <FormGroup row>
            <FormControlLabel control={<Checkbox checked={false} />} label="아이디 저장" />
            <span style={{ alignSelf: 'center' }}>
              <Link href="/#">아이디 찾기</Link> | <Link href="/#">비밀번호 찾기</Link>
            </span>
          </FormGroup>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginBottom: '10px' }}
          >
            로그인
          </Button>
          <Button variant="outlined" color="primary">
            <Link to="/join">회원가입</Link>
          </Button>
        </LoginWrapper>
      </LoginContainer>
    </DefaultLayout>
  );
};

export default Login;
