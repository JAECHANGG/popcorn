import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import * as S from './style';
import styled from 'styled-components';

const TestImgSlide = () => {
  const { state: detailData } = useLocation();

  const img = detailData?.imgURL;

  const [nav1, setNav1] = useState<any>(null);
  const [nav2, setNav2] = useState<any>(null);
  const [slider1, setSlider1] = useState<any>(null);
  const [slider2, setSlider2] = useState<any>(null);

  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  });

  // 메인 이미지 슬라이드 세팅
  const settingsMain: any = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    fade: true,
    asNavFor: '.slider-nav',
  };

  // 썸네일 이미지 슬라이드 세팅
  const settingsThumbs: any = { 
    slidesToShow: img?.length < 3 ? img?.length : 3,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    arrows: false,
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    centerPadding: '10px',
  };

  return (
    <S.ImgSlideWrap>
      <S.ImgContainer>
        <S.MainImgContainer>
          <SliderStyle
            {...settingsMain}
            asNavFor={nav2}
            ref={(slider) => setSlider1(slider)}
          >
            {img?.map((slide: any, idx: any) => {
              return (
                <S.MainImgDiv key={idx}>
                  <img src={`${slide}=${slide?.id}`} />
                </S.MainImgDiv>
              );
            })}
          </SliderStyle>
        </S.MainImgContainer>
        <S.ThumbnailImgContainer>
          <SliderStyle
            {...settingsThumbs}
            asNavFor={nav1}
            ref={(slider) => setSlider2(slider)}
          >
            {img?.map((slide: any, idx: any) => {
              return (
                <S.ThumbnailImg key={idx}>
                  <img src={`${slide}=${slide?.id}`} />
                </S.ThumbnailImg>
              );
            })}
          </SliderStyle>
        </S.ThumbnailImgContainer>
      </S.ImgContainer>
    </S.ImgSlideWrap>
  );
};

export default TestImgSlide;

// 슬라이더 라이브러리 css
export const SliderStyle = styled(Slider)`
  cursor: pointer;
  width: 100%;
`;
