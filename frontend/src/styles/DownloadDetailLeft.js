import styled from '@emotion/styled';

export const DetailTitleWrapper = styled.div`
  display: grid;
  grid-template-columns: 60px auto 30px;
  grid-column-gap: 30px;
`;
export const DetailContentWrapper = styled.div`
  margin-top: 30px;
  min-height: 200px;
`;
export const DetailDescBarItems = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 40px;
`;
export const DetailDescBarItem = styled.li`
  border-bottom: ${(props) => (props.bottomLine === true ? '4px solid #40e0d0' : '0')};
  margin-right: 30px;
  padding: 10px 0;
  cursor: pointer;
  transition: 0.1s linear;
  &:hover {
    opacity: 0.5;
  }
`;
