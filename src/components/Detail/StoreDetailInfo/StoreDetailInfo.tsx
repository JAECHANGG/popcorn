/* style */
import * as S from './style';
/* library */
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import KakaoShare from './KakaoShare';
import StoreDetailImg from '../StoreDetailImg/StoreDetailImg';
/* icons */
import { BsBookmarkHeart } from 'react-icons/bs';
import { MdIosShare } from 'react-icons/md';
/* componant */
import { Store } from '../../../types/data/storeInterface';
import COLORS from '../../../assets/CSS/colors';
import { BookMark } from '../../../types/data/storeInterface';
import StoreEmoji from '../StoreEmoji/StoreEmoji';
/* firebase */
import { auth } from '../../../services/firebase';
import { JSON_API } from '../../../services/api';
import { useRecoilState, useRecoilValue } from 'recoil';
import { kakaoAccessToken, userInfoState } from '../../../atoms';
/* img */
import bookmarkHeartBlack from '../../../assets/Img/State=Default.svg';
import bookmarkHeartOrange from '../../../assets/Img/State=Pressed.svg';

interface Props {
  detailData: Store;
}

const StoreDetailInfo = ({ detailData }: any) => {
  const [currentUser, setCurrentUser] = useState<any>('');
  const [changeColor, setChangeColor] = useState<string>(`${COLORS.gray5}`);
  const [bookMarkState, setBookMarkState] = useState<boolean>();
  const [currentBookMarkId, setCurrentBookMarkId] = useState<string>('');
  const [kakaoUserInfo, setKakaoUserInfo] = useRecoilState(userInfoState);
  const accessToken = useRecoilValue(kakaoAccessToken);
  console.log('userInfoState', userInfoState);
  console.log('kakaoUserInfo', kakaoUserInfo);
  console.log('kakaoUserInfo.id', kakaoUserInfo.id);
  console.log('currentUser', currentUser);
  // 현재 로그인한 사용자 가져오기
  useEffect(() => {
    if (accessToken !== '') {
      setCurrentUser({
        isLogin: true,
        userInfomation: {
          displayName: kakaoUserInfo.nickName,
          email: kakaoUserInfo.email,
          photoURL: '',
          uid: '',
          age: kakaoUserInfo.age,
          gender: kakaoUserInfo.gender,
          phoneNumber: '',
          id: kakaoUserInfo.id,
        },
      });
      fetchBookmarks();
    } else {
      auth.onAuthStateChanged((user) => {
        console.log(user);
        if (user) {
          setCurrentUser(auth.currentUser);
          fetchBookmarks();
        }
      });
    }
  }, [accessToken, kakaoUserInfo]);

  // 북마크 상태 업데이트
  useEffect(() => {
    fetchBookmarks();
  }, [bookMarkState, changeColor]);

  const NewBookmark = {
    id: currentUser.uid + detailData?.id,
    uid: kakaoUserInfo.id,
    store: detailData?.id,
    user: auth.currentUser?.uid,
    notification: false,
    title: detailData?.title,
    open: detailData?.open,
    close: detailData?.close,
    imgURL: detailData?.imgURL[0],
    item: detailData?.item,
  };

  // 페이지 렌딩시 유저의 북마크 유무 확인
  // 카카오로 로그인 시에도 북마크 추가 잘됨
  const fetchBookmarks = async () => {
    const { data } = await axios.get(`${JSON_API}/BookMarkList`); // 북마크 리스트

    data.map((bookmark: BookMark) => {
      if (
        bookmark.user === currentUser.uid &&
        bookmark.store === detailData?.id
      ) {
        // 유저가 북마크를 했음
        setChangeColor(`${COLORS.orange2}`);
        setBookMarkState(true);
        setCurrentBookMarkId(bookmark.id);
      } else {
        // 북마크안했음
        setChangeColor(`${COLORS.gray5}`);
        setBookMarkState(false);
      }
    });
  };

  // 클릭했을 때 북마크에 추가 + 삭제
  const postBookmarkHandler = async () => {
    if (currentUser) {
      if (bookMarkState) {
        // 북마크가 있을 경우 삭제
        try {
          if (accessToken) {
            const response = await axios.delete(
              `${JSON_API}/BookMarkList/${currentBookMarkId}`,
              {
                headers: { Authorization: `Bearer ${accessToken}` },
              },
            );
            console.log('response', response);
            setChangeColor(`${COLORS.gray5}`);
            setBookMarkState(false);
          } else {
            // Firebase Auth를 사용하는 경우
            await axios.delete(`${JSON_API}/BookMarkList/${currentBookMarkId}`);
            setChangeColor(`${COLORS.gray5}`);
            setBookMarkState(false);
          }
        } catch (error) {
          console.log('error', error);
        }
      } else {
        //북마크가 없을 경우 추가
        try {
          if (accessToken) {
            // Kakao Access Token이 존재하는 경우
            const response = await axios.post(
              `${JSON_API}/BookMarkList`,
              NewBookmark,
              {
                headers: { Authorization: `Bearer ${accessToken}` },
              },
            );
            console.log('response', response);
            setChangeColor(`${COLORS.orange2}`);
            setBookMarkState(true);
          } else {
            // Firebase Auth를 사용하는 경우
            await axios.post(`${JSON_API}/BookMarkList`, NewBookmark);
            setChangeColor(`${COLORS.orange2}`);
            setBookMarkState(true);
          }
        } catch (error) {
          console.log('error', error);
        }
      }
    } else {
      alert('로그인이 필요합니다!');
    }
  };
  return (
    <S.StoreDetailInfoWrap>
      <S.DetailContainer>
        {/* 이미지 슬라이드 컴포넌트 */}
        <StoreDetailImg />
        {/* 디테일 정보 부분 (이모티콘 위 하단선까지) */}
        <S.DetailInfoContent>
          <S.TitleWrap>
            <S.Title>{detailData?.title}</S.Title>
            <S.SideTitleWrap>
              <S.SideTitleIconText>
                <S.SideTitleIcon>{detailData?.view.all}</S.SideTitleIcon>
                <S.SideTitleText style={{ marginTop: '4px' }}>
                  조회수
                </S.SideTitleText>
              </S.SideTitleIconText>
              <S.SideTitleIconText>
                <S.SideTitleIcon>
                  <MdIosShare style={{ fontSize: '14px' }} />
                </S.SideTitleIcon>
                <S.SideTitleText>
                  {/* 공유 */}
                  <KakaoShare detailData={detailData} />
                </S.SideTitleText>
              </S.SideTitleIconText>
              <S.SideTitleIconText>
                <S.BookmarkClick
                  onClick={postBookmarkHandler}
                  style={{
                    border: 'none',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                  }}
                >
                  {bookMarkState ? (
                    <S.BookMarkImg src={bookmarkHeartOrange} />
                  ) : (
                    <S.BookMarkImg src={bookmarkHeartBlack} />
                  )}
                  {/* <S.BookMarkImg src={bookmarkHeartBlack} /> */}
                </S.BookmarkClick>
                <S.SideTitleText>북마크</S.SideTitleText>
              </S.SideTitleIconText>
            </S.SideTitleWrap>
          </S.TitleWrap>
          {/* 스토어 정보 들어가는 부분 */}
          <S.InfoContentWrap>
            <S.InfoContentBox>
              <S.InfoSubBox>
                <S.InfoTitle>운영기간</S.InfoTitle>
                <S.InfoContentText>{`${detailData?.open} ~ ${detailData?.close}`}</S.InfoContentText>
              </S.InfoSubBox>
              <S.InfoSubBox>
                <S.InfoTitle>운영시간</S.InfoTitle>
                <S.OpeningHoursWrap>
                  <S.OpeningHoursBox>
                    {detailData?.openingTime?.map((openTime: string) => {
                      return <span key={uuidv4()}>{openTime + '-'}</span>;
                    })}
                  </S.OpeningHoursBox>
                  <S.OpeningHoursBox>
                    {detailData?.closeTime?.map((closeTime: string) => {
                      return <span key={uuidv4()}>{closeTime}</span>;
                    })}
                  </S.OpeningHoursBox>
                </S.OpeningHoursWrap>
              </S.InfoSubBox>
              <S.InfoSubBox>
                <S.InfoTitle>주소</S.InfoTitle>
                <S.InfoContentText>{detailData?.address}</S.InfoContentText>
              </S.InfoSubBox>
              <S.InfoSubBox>
                <S.InfoTitle>스토어 설명</S.InfoTitle>
                <S.InfoContentText>{detailData?.explain}</S.InfoContentText>
              </S.InfoSubBox>
              <S.InfoSubBox>
                <S.InfoTitle>SNS계정</S.InfoTitle>
                <S.InfoContentText>
                  <S.SnsLinkWrap>
                    <Link
                      to={detailData?.sns}
                      target="_blank"
                      style={{ color: '#323232' }}
                    >
                      <S.SnsImg
                        src={require('../../../assets/Img/Instagram.png')}
                      />
                    </Link>
                  </S.SnsLinkWrap>
                  <S.SnsLinkWrap style={{ marginTop: '10px' }}>
                    <Link
                      to={detailData?.web}
                      target="_blank"
                      style={{ color: '#323232' }}
                    >
                      <S.SnsImg src={require('../../../assets/Img/Link.png')} />
                    </Link>
                  </S.SnsLinkWrap>
                </S.InfoContentText>
              </S.InfoSubBox>
              <S.InfoSubBox>
                <S.InfoTitle>카테고리</S.InfoTitle>
                <S.InfoContentText>{detailData?.item}</S.InfoContentText>
              </S.InfoSubBox>
            </S.InfoContentBox>
          </S.InfoContentWrap>
        </S.DetailInfoContent>
      </S.DetailContainer>

      {/* 좋아요/별로에요 이모티콘 컴포넌트 */}
      <StoreEmoji detailData={detailData} />
    </S.StoreDetailInfoWrap>
  );
};

export default StoreDetailInfo;
