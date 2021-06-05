import React from 'react';
import { Link } from 'react-router-dom';
import {
  DownloadCardContainer,
  DownloadCardImg,
  DownloadCardImgWrapper,
  DownloadTagWrapper,
} from '../../styles/Download';
import TextDefault from '../ui/TextDefault';

const DownloadCard = (props) => {
  const { content } = props;

  return (
    <DownloadCardContainer>
      <Link to={`/blockfish/download/detail/${content.id}`}>
        <DownloadCardImgWrapper>
          <DownloadCardImg alt="" src={content.imgSrc} />
        </DownloadCardImgWrapper>
      </Link>
      <div>
        <DownloadTagWrapper>
          <Link to={`/blockfish/download/detail/${content.id}`}>
            <TextDefault width="100px" size="15px" weight="700">
              유틸리티
            </TextDefault>
          </Link>

          <TextDefault width="100px" size="15px" weight="700">
            ,
          </TextDefault>

          <Link to={`/blockfish/download/detail/${content.id}`}>
            <TextDefault width="100px" size="15px" weight="700">
              백신
            </TextDefault>
          </Link>
          <TextDefault width="100px" size="15px" weight="700">
            ,
          </TextDefault>

          <Link to={`/blockfish/download/detail/${content.id}`}>
            <TextDefault width="100px" size="15px" weight="700">
              브라우저
            </TextDefault>
          </Link>
        </DownloadTagWrapper>
        <div style={{ marginBottom: 10 }}>
          <Link to={`/blockfish/download/detail/${content.id}`}>
            <TextDefault size="16px" weight="700">
              {content.title}
            </TextDefault>
          </Link>
        </div>
        <div style={{ marginBottom: 10 }}>
          <TextDefault size="14px" lineHeight="14px" color="#808080">
            {content.descption}
          </TextDefault>
        </div>
      </div>
    </DownloadCardContainer>
  );
};

export default DownloadCard;
