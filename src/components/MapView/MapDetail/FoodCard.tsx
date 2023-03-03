import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FoodCard = ({ food, setMyLocation, setInfo }: any) => {
  const foodCenterChangeHandler = () => {
    setMyLocation({ Ma: food.position.lat, La: food.position.lng });
    setInfo(food);
  };

  return (
    <Wrap onClick={foodCenterChangeHandler}>
      <DetailImg
        src={
          food.imgURL
            ? food?.imgURL
            : 'https://firebasestorage.googleapis.com/v0/b/popcorn1-4b47e.appspot.com/o/NotFoundImg.png?alt=media&token=af4548f5-25fc-4b85-9d78-82b16c932a08'
        }
        alt="사진"
      />
      <DetailWrap>
        <DetailTitle>{food?.title}</DetailTitle>
        <DetailDescriptionWrap>
          <DetailDescription>{food?.address}</DetailDescription>
          <DetailDescription>
            <Link to={food.placeURL}>자세히 보기</Link>
          </DetailDescription>
        </DetailDescriptionWrap>
      </DetailWrap>
    </Wrap>
  );
};

export default FoodCard;

const Wrap = styled.div`
  border: 1px solid #d9d9d9;
  background-color: #f5f5f5;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 130px;
  cursor: pointer;
`;

const DetailWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  justify-content: space-between;
`;
const DetailTitle = styled.span`
  font-weight: 800;
  font-size: 17px;
  line-height: 29px;
  color: #323232;
`;
const DetailDescription = styled.span`
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: #a6a6a6;
`;

const DetailDescriptionWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const DetailImg = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 8px 0px 0px 8px;
`;
