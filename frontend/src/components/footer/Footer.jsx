import React from 'react';
import {
  FooterContainer,
  FooterMainWrapper,
  FooterWrapper,
  FooterItems,
  FooterItem,
  FooterItemText,
  FooterItemUnderLine,
} from '../../styles/DefaultLayout';
import TextDefault from '../ui/TextDefault';

import { ReactComponent as GithubSvg } from '../../assets/github.svg';

const footer = () => (
  <FooterContainer>
    {/* Footer Wrapper - 시작 */}
    <FooterWrapper>
      <FooterMainWrapper>
        <TextDefault size="30px" color="#fff" lineHeight="55px" weight="700">
          BlockFish
        </TextDefault>
        <TextDefault size="15px" color="#fff" lineHeight="30px">
          © Copyright 2021 BlockFish. All rights reserved.
        </TextDefault>
      </FooterMainWrapper>
      {/* <FooterItems>
        <FooterItem>
          <TextDefault size="16px" color="#fff">
            회사소개
          </TextDefault>
        </FooterItem>
        <FooterItem>
          <TextDefault size="16px" color="#fff">
            이용약관
          </TextDefault>
        </FooterItem>
        <FooterItem>
          <TextDefault size="16px" color="#fff">
            개인정보처리방침
          </TextDefault>
        </FooterItem>
        <FooterItem>
          <TextDefault size="16px" color="#fff">
            쿠키설정
          </TextDefault>
        </FooterItem>
      </FooterItems>
      <FooterItems>
        <FooterItem>
          <TextDefault size="20px" color="#fff" lineHeight="30px" weight="700">
            Youtube
          </TextDefault>
        </FooterItem>
        <FooterItem>
          <TextDefault size="20px" color="#fff" lineHeight="30px" weight="700">
            Twitter
          </TextDefault>
        </FooterItem>
        <FooterItem>
          <TextDefault size="20px" color="#fff" lineHeight="30px" weight="700">
            Facebook
          </TextDefault>
        </FooterItem>
        <FooterBottom>© Copyright 2021 BlockFish. All rights reserved.</FooterBottom>
      </FooterItems> */}

      {/* Footer 링크 리스트 - 시작 */}
      <FooterItems>
        <FooterItem>
          <GithubSvg width="20" height="20" fill="#fff" style={{ marginRight: 10 }} />
          <FooterItemText>
            <a href="https://github.com/clilc/blockfish">
              <TextDefault size="15px" color="#fff" lineHeight="30px" weight="700">
                BlockFish Github 저장소
              </TextDefault>
              <FooterItemUnderLine />
            </a>
          </FooterItemText>
        </FooterItem>
      </FooterItems>
      {/* Footer 링크 리스트 - 끝 */}
    </FooterWrapper>
    {/* Footer Wrapper - 끝 */}
  </FooterContainer>
);

export default footer;
