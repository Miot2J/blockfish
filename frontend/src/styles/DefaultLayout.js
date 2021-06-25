import styled from '@emotion/styled';

export const NavTopBar = styled.div`
  width: 100%;
  height: 40px;
  background-color: #282828;
  color: #eeeeee;
`;
export const NavTopBarUl = styled.ul`
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #eeeeee;
  padding: 0 80px;
`;
export const NavTopBarLi = styled.li`
  height: 100%;
  margin-left: 20px;
  cursor: pointer;
  line-height: 35px;
  transition: 0.2s ease-in-out;
  &:hover {
    a{
      opacity: 0.7;
    }
    div {
      width: 100%;
    }
  }
}
`;
export const NavTopBarUnderLine = styled.div`
  height: 2px;
  width: 0;
  background-color: #fff;
  transition: 0.2s ease-in-out;
`;
export const NavContainer = styled.div`
  width: 100%;
`;
export const NavMainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 80px;
  background-color: #f8f5f3;
`;
export const NavMainWrapper = styled.div`
  display: flex;
  height: 90px;
  width: 100%;
  align-items: center;
`;
export const NavMainUl = styled.ul`
  display: flex;
  align-items: center;
  margin-left: 60px;
`;
export const NavMainLi = styled.li`
  cursor: pointer;
  padding: 10px 0;
  margin-right: 20px;
  transition: 0.2s ease-in-out;
  &:hover {
    a {
      opacity: 0.7;
    }
    div {
      width: 100%;
    }
  }
`;
export const NavMainUnderLine = styled.div`
  height: 2px;
  width: 0;
  background-color: #282828;
  transition: 0.2s ease-in-out;
`;
export const NavImgWrapper = styled.div`
  cursor: pointer;
  transition: 0.2s ease-in-out;
  &:hover {
    opacity: 0.5;
  }
`;
export const FooterContainer = styled.footer`
  width: 100%;
  background-color: black;
  justify-content: space-between;
  align-items: center;
  color: white;
`;
export const FooterWrapper = styled.div`
  padding: 25px 80px;
`;
export const FooterMainWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const FooterBottomItems = styled.div`
  margin-top: 12px;
`;
export const FooterItems = styled.ul`
  display: flex;
  align-items: center;
`;
export const FooterItem = styled.li`
  display: flex;
  align-items: center;
`;
export const FooterItemText = styled.div`
  height: 100%;
  cursor: pointer;
  line-height: 20px;
  transition: 0.25s ease-out;
  &:hover {
    a {
      opacity: 0.7;
    }
    div {
      width: 100%;
    }
  }
`;
export const FooterItemUnderLine = styled.div`
  height: 2px;
  width: 0;
  background-color: #fff;
  transition: 0.2s ease-in-out;
`;
export const FooterBottom = styled.div`
  width: 100%;
  color: white;
  padding: 30px 0 10px 0;
  text-align: center;
`;
export const MainConent = styled.section`
  width: 100%;
  min-height: calc(100vh - 267px);
`;
export const MainConentContainer = styled.section`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;
export const MainConentWrapper = styled.div`
  padding: 50px 20px 80px 20px;
`;

// MyPage Layout
export const MyPageListContainer = styled.div`
  max-width: 1080px;
  min-width: 1080px;
  border: 1px solid #ececec;
  border-radius: 12px;
  box-shadow: 2px 2px 4px 1px rgba(40, 40, 40, 0.3);
  margin: 0 auto;
`;
export const MyPageListItems = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 40px;
`;
export const MyPageListItem = styled.li`
  text-align: center;
  color: ${(props) => (props.viewState ? '#4169e1' : '#808080')};
  transition: 0.1s linear;
  &:hover {
    opacity: 0.7;
  }
`;
export const MyPageContentContainer = styled.article`
  max-width: 1080px;
  min-width: 1080px;
  margin: 70px auto 0 auto;
`;
