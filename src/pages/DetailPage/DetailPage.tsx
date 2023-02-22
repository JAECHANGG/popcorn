import axios from 'axios';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userInfo } from '../../atoms';
import DetailMap from '../../components/Detail/DetailMap/DetailMap';
import DetailPageViews from '../../components/Detail/DetailPageViews/DetailPageViews';
import StoreDetailInfo from '../../components/Detail/StoreDetailInfo/StoreDetailInfo';
import StoreEmoji from '../../components/Detail/StoreEmoji/StoreEmoji';

const DetailPage: any = () => {
  // query써서 캐싱되서 업데이트 한번밖에 안된다.
  const { state: detailData } = useLocation();
  const users = useRecoilValue(userInfo);
  const [viewCountData, setViewCountData] = useState<any>();
  const [userAge, setUserAge] = useState('');
  const today = new Date(); // 오늘 날짜
  const birthDay = new Date(users.userInfomation.age); // 유저 생일
  // const [age, setAge] = useState(today.getFullYear() - birthDay.getFullYear()); // 유저의 나이 계산
  // 유저가 갱신이 안되어 있다.
  // 조회수가 popup.json.view 값에 나이, 성별이 없어 undefiend로 업데이트 되는 에러
  // 유저 상태관리를 Router.tsx > Layout.tsx로 옮겨 해결함
  console.log(users.userInfomation);

  // 나이에 따른 연령대를 셋팅해주는 함수
  const generation = () => {
    const age = today.getFullYear() - birthDay.getFullYear();
    if (age < 0 && age >= 0 && age < 10) setUserAge('연령모름');
    if (age >= 10 && age < 20) setUserAge('10');
    if (age >= 20 && age < 30) setUserAge('20');
    if (age >= 30 && age < 40) setUserAge('40');
    if (age > 40) setUserAge('40+');
    console.log(age, 'ageage');
  };

  const fetchStoreData = async () => {
    console.log(detailData.id, '!@@@@@@@@@@@@@@@@@@@@@!');

    const { data } = await axios.get(
      `http://localhost:3010/Store/${detailData.id}`,
    );
    console.log(data, 'datadatadtatad');
    setViewCountData(data);
  };

  // 데이터를 업데이트 해주는 함수
  // 연령대 + 1, 성별 + 1 전체 수 + 1,
  const upDateViews = async () => {
    try {
      console.log('#####$$$$$$$$$$$$$$$$$$$$$', viewCountData);
      await axios.patch(`http://localhost:3010/Store/${detailData.id}`, {
        view: {
          ...viewCountData.view,
          [userAge]: viewCountData.view[userAge] + 1,
          [users.userInfomation.gender]:
            viewCountData.view[users.userInfomation.gender] + 1,
          all: viewCountData.view['all'] + 1,
        },
      });
    } catch (error) {
      console.log(error);
    }
    console.log('##################');

    fetchStoreData();
  };

  // age 값이 변하면 연령대 설정하기
  useEffect(() => {
    if (birthDay) generation();
  }, [birthDay]);

  useEffect(() => {
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    fetchStoreData();
  }, []);

  // 연령대가 설정되면 Json 서버 데이터 업데이트 하기
  useEffect(() => {
    if (userAge !== '') {
      console.log(detailData.id, 'awkelfjwefklwejk');
      upDateViews();
    }
  }, [userAge]);
  console.log(userAge, 'userage!!!');
  return (
    <>
      <StoreDetailInfo detailData={viewCountData} />
      {/* <StoreEmoji /> */}
      <DetailPageViews detailData={viewCountData} />
      <DetailMap />
    </>
  );
};

export default DetailPage;
