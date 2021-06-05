import styled from '@emotion/styled';
import { Button } from '@material-ui/core';

export const DownloadContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  @media screen and (max-width: 1440px) {
    max-width: 1080px;
  }
  @media screen and (max-width: 1080px) {
    max-width: 768px;
  }
`;
export const LeftLayout = styled.div`
  max-width: 250px;
  border: 1px solid #303030;
  padding: 25px 25px;
  border-radius: 8px;
  box-shadow: 2px 3px 5px rgb(63 63 63 / 30%);
`;
export const RightLayout = styled.div`
  width: 100%;
`;
export const CheckboxItems = styled.ul`
  margin-top: 15px;
`;
export const CheckboxItem = styled.li`
  display: flex;
`;
export const RefreshButton = styled(Button)({
  background: 'none',
  border: 0,
  borderRadius: 3,
  color: '#000 !important',
  width: '100px',
  '.MuiButton-label': {
    justifyContent: 'space-between',
  },
});
export const SortItems = styled.ul`
  display: flex;z
  margin: 10px 0;
`;
export const SortItemWrapper = styled.span`
  cursor: pointer;
  transition: 0.1s linear;
  padding-bottom: 2px;
  &:hover {
    opacity: 0.5;
    border-bottom: 1px solid #808080;
  }
`;
export const ButtonWrapper = styled.span`
  cursor: pointer;
  margin-left: 7px;
  transition: 0.1s linear;
  &:hover {
    opacity: 0.5;
  }
`;
export const MenuBarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;
export const SortItem = styled.ul`
  padding: 0 5px;
`;

export const SliderContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 30px;
`;
export const GridLayoutWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 350px);
  grid-gap: 30px;
  justify-content: center;
  @media screen and (max-width: 1440px) {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
  }
  @media screen and (max-width: 1080px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 15px;
  }
  @media screen and (max-width: 700px) {
    grid-template-columns: 1fr;
    grid-gap: 30px;
  }
`;
export const ListGubunBarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 10px;
`;
export const DownloadCardContainer = styled.div`
  width: 100%;
`;
export const DownloadCardImgWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 257px;
  margin-bottom: 30px;
`;
export const DownloadCardImg = styled.img`
  max-width: 350px;
  height: 100%;
  border-radius: 7px;
`;
export const DownloadTagWrapper = styled.div`
  margin-bottom: 5px;
`;
