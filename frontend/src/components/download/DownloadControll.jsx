import React from 'react';
import useInput from '../../hooks/useInputPage';
import SelectDefault from '../ui/SelectDefault';

const DownloadControll = () => {
  const [os, onChangeOs] = useInput('');
  const [category, onChangeCategory] = useInput('');
  const [price, onChangePrice] = useInput('');
  const [rating, onChangeRating] = useInput('');

  // 더미데이터
  const osList = [
    { id: 0, name: 'Android' },
    { id: 1, name: 'iOS' },
    { id: 2, name: 'MAC' },
    { id: 2, name: 'Windows' },
  ];
  const categoryList = [
    { id: 0, name: '일반' },
    { id: 1, name: '보안' },
    { id: 1, name: '유틸리티' },
    { id: 3, name: '미디어' },
  ];
  const priceList = [
    { id: 0, name: '유료' },
    { id: 1, name: '무료' },
  ];
  const ratingList = [
    { id: 0, name: '1' },
    { id: 1, name: '2' },
    { id: 2, name: '3' },
    { id: 2, name: '4' },
    { id: 2, name: '5' },
  ];

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <SelectDefault value={os} menuItems={osList} selectName="OS" onChangeMenu={onChangeOs} />
      <SelectDefault
        value={category}
        menuItems={categoryList}
        selectName="카테고리"
        onChangeMenu={onChangeCategory}
      />
      <SelectDefault
        value={price}
        menuItems={priceList}
        selectName="가격"
        onChangeMenu={onChangePrice}
      />
      <SelectDefault
        value={rating}
        menuItems={ratingList}
        selectName="별점"
        onChangeMenu={onChangeRating}
      />
    </div>
  );
};

export default DownloadControll;
