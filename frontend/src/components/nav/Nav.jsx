import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  NavMainLi,
  NavContainer,
  NavMainUl,
  NavTopBar,
  NavTopBarUl,
  NavTopBarLi,
  NavMainWrapper,
  NavTopBarUnderLine,
  NavMainUnderLine,
  NavMainContainer,
  NavImgWrapper,
} from '../../styles/DefaultLayout';
import TextDefault from '../ui/TextDefault';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as SearchSvg } from '../../assets/search-black.svg';
import { openModal } from '../../modules/actions/modal';
import { isEmpty } from '../../utils/utils';

const Nav = () => {
  const history = useHistory();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleOpen = () => {
    dispatch(openModal('SEARCH_MODAL', {}));
  };
  const onClickLogout = () => {
    // 쿠키 제거 또는 로그아웃 API 연동 필요
    alert('로그아웃 되었습니다');
  };
  const onClickUploadBtn = () => {
    // 로그인 검증 작업 필요
    history.push('/my-page/upload');
  };

  return (
    <nav>
      {/* <showSearch showSearch={showSearch} handleClose={handleClose} /> */}
      <NavContainer>
        <NavTopBar>
          <NavTopBarUl>
            <NavTopBarLi>
              {!isEmpty(user) ? (
                <>
                  <TextDefault size="15px" color="#eee" lineHeight="35px" onClick={onClickLogout}>
                    로그아웃
                  </TextDefault>
                  <NavTopBarUnderLine />
                </>
              ) : (
                <Link to="/login">
                  <TextDefault size="15px" color="#eee" lineHeight="35px">
                    로그인
                  </TextDefault>
                  <NavTopBarUnderLine />
                </Link>
              )}
            </NavTopBarLi>
            <NavTopBarLi>
              {isEmpty(user) ? (
                <Link to="/join">
                  <TextDefault size="15px" color="#eee" lineHeight="35px">
                    회원가입
                  </TextDefault>
                  <NavTopBarUnderLine />
                </Link>
              ) : (
                <Link to="/my-page">
                  <TextDefault size="15px" color="#eee" lineHeight="35px">
                    마이페이지
                  </TextDefault>
                  <NavTopBarUnderLine />
                </Link>
              )}
            </NavTopBarLi>
          </NavTopBarUl>
        </NavTopBar>
      </NavContainer>

      <NavContainer>
        <NavMainContainer>
          <NavMainWrapper>
            <div>
              <Link to="/blockfish">
                <TextDefault size="30px" color="#000" weight="700">
                  BlockFish
                </TextDefault>
              </Link>
            </div>

            <NavMainUl>
              <NavMainLi>
                <Link to="/blockfish/download">
                  <TextDefault size="18px" color="#282828" weight="700" lineHeight="35px">
                    카테고리
                  </TextDefault>
                  <NavMainUnderLine />
                </Link>
              </NavMainLi>
              <NavMainLi onClick={onClickUploadBtn}>
                <TextDefault size="18px" color="#282828" weight="700" lineHeight="35px">
                  업로드
                </TextDefault>
                <NavMainUnderLine />
              </NavMainLi>
            </NavMainUl>
          </NavMainWrapper>

          <NavImgWrapper onClick={handleOpen}>
            <SearchSvg width="30px" height="30px" color="#282828" />
          </NavImgWrapper>
        </NavMainContainer>
      </NavContainer>
    </nav>
  );
};

export default Nav;
