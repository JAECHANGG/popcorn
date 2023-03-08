import * as S from './style';
import { useQuery } from 'react-query';
import { getPopupData } from '../../services/api';
import Banner from '../../components/HomePage/Banner/Banner';
import CategorySwiper from '../../components/HomePage/Swiper/CategorySwiper';
import ClosingSoonSwiper from '../../components/HomePage/Swiper/ClosingSoonSwiper';
import WomenPopularSwiper from '../../components/HomePage/Swiper/WomenPopularSwiper';
import MenPopularSwiper from '../../components/HomePage/Swiper/MenPopularSwiper';
import HomeSearch from '../../components/HomePage/Search/HomeSearch';
import { useEffect } from 'react';

const HomePage: any = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { isLoading, isError, data, error } = useQuery('popup', getPopupData);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>Error!!!</p>;
  }

  return (
    <S.HomePageContainer>
      <Banner />
      <S.SearchContainer>
        <HomeSearch />
      </S.SearchContainer>
      <S.HomePageContentContainer>
        <S.CategoryWrapper>
          <S.ListTitleContainer>
            <S.CategoryTitleBackgroundOne />
            <S.ListTitle>최근 오픈했어요!</S.ListTitle>
          </S.ListTitleContainer>
          <S.CategoryListContainer>
            <S.FilterStoreList>
              <CategorySwiper />
            </S.FilterStoreList>
          </S.CategoryListContainer>
        </S.CategoryWrapper>
        <S.CategoryWrapper>
          <S.ListTitleContainer>
            <S.CategoryTitleBackgroundTwo />
            <S.ListTitle>곧 마감해요</S.ListTitle>
          </S.ListTitleContainer>
          <S.CategoryListContainer>
            <S.FilterStoreList>
              <ClosingSoonSwiper />
            </S.FilterStoreList>
          </S.CategoryListContainer>
        </S.CategoryWrapper>
        <S.CategoryWrapper>
          <S.ListTitleContainer>
            <S.CategoryTitleBackgroundThree />
            <S.ListTitle>여성 인기 팝업스토어</S.ListTitle>
          </S.ListTitleContainer>
          <S.CategoryListContainer>
            <S.FilterStoreList>
              <WomenPopularSwiper />
            </S.FilterStoreList>
          </S.CategoryListContainer>
        </S.CategoryWrapper>
        <S.CategoryWrapper>
          <S.ListTitleContainer>
            <S.CategoryTitleBackgroundThree />
            <S.ListTitle>남성 인기 팝업스토어</S.ListTitle>
          </S.ListTitleContainer>
          <S.CategoryListContainer>
            <S.FilterStoreList>
              <MenPopularSwiper />
            </S.FilterStoreList>
          </S.CategoryListContainer>
        </S.CategoryWrapper>
      </S.HomePageContentContainer>
    </S.HomePageContainer>
  );
};

export default HomePage;
