import { useEffect, useRef, useState } from 'react';
import * as S from './style';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useQuery } from 'react-query';
import { getFaq } from '../../../services/api';

const Faq: any = () => {
  const [isClicked, setIsClicked] = useState(null);
  const { isLoading, isError, data, error } = useQuery('FAQ', getFaq);

  if (isLoading) {
    console.log('로딩중');
    return <p>Loading...</p>;
  }
  if (isError) {
    console.log('오류내용', error);
    return <p>Error!!!</p>;
  }
  const clickHandler = (i: any) => {
    if (isClicked === i) {
      return setIsClicked(null);
    }
    setIsClicked(i);
  };

  return (
    <S.FaqWrap>
      {data.map((qa: any, i: any) => {
        return (
          <S.Container key={qa.id}>
            <S.TitleBox onClick={() => clickHandler(i)}>
              <span>Q. {qa.Q}</span>
              {isClicked === i ? <IoIosArrowDown /> : <IoIosArrowUp />}
            </S.TitleBox>
            <S.AnswerBox className={isClicked === i ? 'show' : ''}>
              <S.AnswerText>A. {qa.A}</S.AnswerText>
            </S.AnswerBox>
          </S.Container>
        );
      })}
    </S.FaqWrap>
  );
};
export default Faq;
