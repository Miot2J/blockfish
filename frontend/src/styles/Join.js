import styled from '@emotion/styled';
import { Button, Checkbox } from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors';

export const JoinContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 80px 50px 30px 50px;
  max-width: 960px;
  margin: 0 auto;
`;
export const JoinCheckboxWrapper = styled.div`
  margin: 60px 0 30px 0;
`;
export const JoinContentWrapper = styled.div`
  width: 250px;
`;

export const JoinCheckbox = styled(Checkbox)({
  color: blueGrey[900],
  '.Mui-checked': {
    color: blueGrey[700],
  },
});

export const JoinButton = styled(Button)({
  background: 'linear-gradient(45deg, #263238 30%, #78909c 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(38, 50, 56, .3)',
  color: 'white !important',
  width: '100%',
  height: 48,
  padding: '0 30px !important',
  '.MuiButton-label': {
    justifyContent: 'space-between',
  },
});
