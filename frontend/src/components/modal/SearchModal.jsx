import React from 'react';
import { useSpring, animated } from 'react-spring';
import {
  SearchBtnWrapper,
  SearchInputWrapper,
  SearchMainWrapper,
  SearchModalContainer,
  SearchModalHeader,
  SearchModalInput,
  SearchModalWrapper,
} from '../../styles/Modal';
import { ReactComponent as CancelSvg } from '../../assets/cancel.svg';
import { ReactComponent as SearchSvg } from '../../assets/search-black.svg';
import { ReactComponent as RemoveSvg } from '../../assets/remove.svg';
import useInput from '../../hooks/useInput';
// const useStyles = makeStyles((theme) => ({
//   modal: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   paper: {
//     backgroundColor: theme.palette.background.paper,
//     border: '2px solid #000',
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing(2, 4, 3),
//   },
// }));

const SearchModal = () => {
  const [search, onChangeSearch] = useInput('');
  const animProps = useSpring({
    config: { duration: 300 },

    from: { marginTop: '-300px', transition: '0.3s ease-out' },
    to: { marginTop: '0px' },
  });

  console.log('search', search);

  return (
    <animated.div style={animProps}>
      <SearchModalContainer>
        <SearchModalWrapper>
          <SearchModalHeader>
            <SearchBtnWrapper>
              <CancelSvg width="35" height="35" fill="#282828" />
            </SearchBtnWrapper>
          </SearchModalHeader>

          <SearchMainWrapper>
            <SearchSvg width="30" height="30" fill="#ececec" style={{ paddingLeft: 15 }} />

            <SearchInputWrapper>
              <SearchModalInput
                type="text"
                placeholder="검색할 내용을 입력해주세요."
                value={search}
                onChange={onChangeSearch}
              />
              <SearchBtnWrapper>
                <RemoveSvg width="15" height="15" fill="gray" />
              </SearchBtnWrapper>
            </SearchInputWrapper>
          </SearchMainWrapper>
        </SearchModalWrapper>
      </SearchModalContainer>
    </animated.div>
  );
};

export default SearchModal;
