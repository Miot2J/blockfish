import React from 'react';
import { Link } from 'react-router-dom';
import {
  DownloadCardContainer,
  DownloadCardImg,
  DownloadCardImgWrapper,
  DownloadTagWrapper,
} from '../../styles/Download';
import TextDefault from '../ui/TextDefault';

import { ReactComponent as IphoneSvg } from '../../assets/iphone-logo.svg';
import { ReactComponent as AndroidSvg } from '../../assets/android-logo.svg';
import { ReactComponent as MacSvg } from '../../assets/mac-logo.svg';
import { ReactComponent as WindowSvg } from '../../assets/windows-logo.svg';

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
        <div style={{ marginBottom: 10 }}>
          <Link to={`/blockfish/download/detail/${content.id}`}>
            <TextDefault size="16px" weight="700">
              {content.title}
            </TextDefault>
          </Link>
        </div>

        <DownloadTagWrapper>
          <Link to={`/blockfish/download/detail/${content.id}`}>{content.category}</Link>

          {(content.os === 'android' && <AndroidSvg width="25px" height="25px" fill="#3bd580" />) ||
            (content.os === 'ios' && <IphoneSvg width="25px" height="25px" fill="#666666" />) ||
            (content.os === 'mac' && <MacSvg width="25px" height="25px" fill="#666666" />) ||
            (content.os === 'window' && <WindowSvg width="25px" height="25px" fill="#00a8e8" />)}
        </DownloadTagWrapper>

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
