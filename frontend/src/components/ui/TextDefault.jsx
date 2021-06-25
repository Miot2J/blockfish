import React from 'react';
import styled from '@emotion/styled';

const TextDefault = (props) => {
  const { children, size, color, weight, lineHeight, letterSpacing, width, onClick } = props;

  return (
    <Text
      size={size && `${size}`}
      color={color && `${color}`}
      weight={weight && `${weight}`}
      lineHeight={lineHeight && `${lineHeight}`}
      letterSpacing={letterSpacing && `${letterSpacing}`}
      width={width && `${width}`}
      onClick={onClick}
    >
      {children}
    </Text>
  );
};

const Text = styled.span`
  width: ${(props) => props.width};
  font-size: ${(props) => props.size};
  color: ${(props) => props.color};
  font-weight: ${(props) => props.weight};
  line-height: ${(props) => props.lineHeight};
  letter-spacing: ${(props) => props.letterSpacing};
  & span:after {
    content: '*';
    size: 16px;
    color: red;
  }
`;

export default TextDefault;
