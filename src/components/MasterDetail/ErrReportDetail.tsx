import axios from 'axios';
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { getInfoErrReport } from '../../services/api';
import * as S from './style';

const ErrReportDetail = () => {
  const navigate = useNavigate();
  const paramId = useParams();
  const { isLoading, isError, data, error } = useQuery(
    'infoErrModifiContents',
    getInfoErrReport,
  );
  // console.log('data', data);

  // console.log('paramId', paramId);

  // useEffect(() => {
  //   getInfoErrReport();
  // }, []);
  if (isLoading) {
    console.log('로딩중');
    return <p>Loading...</p>;
  }
  if (isError) {
    console.log('오류내용', error);
    return <p>Error!!!</p>;
  }

  const selectedDetail = data?.filter((item: any) => item.id === paramId.id);
  // console.log('selectedDetail', selectedDetail);

  const currentState = selectedDetail[0].status;
  // console.log('currentState', currentState);

  const checkHandler = () => {
    alert('확인');
    navigate('/master');
    return axios.patch(
      `http://localhost:3001/infoErrModifiContents/${paramId.id}`,
      {
        status: !currentState,
      },
    );
  };

  return (
    <S.ReportListWrap>
      <S.ReportListContainer>
        <S.ReportTitleBox>
          <h2>정보 오류&수정 제보</h2>
        </S.ReportTitleBox>

        <S.ReportContentListWrap>
          {selectedDetail?.map((li: any) => {
            return (
              <S.GridBox key={li.id}>
                <S.Grid>
                  <S.ReportTitle>제목</S.ReportTitle>
                  <S.ReportContentText>{li.title}</S.ReportContentText>
                </S.Grid>
                <S.Grid>
                  <S.ReportTitle>제보자</S.ReportTitle>
                  <S.ReportContentText>
                    {li.userId.displayName}
                  </S.ReportContentText>
                </S.Grid>
                <S.Grid>
                  <S.ReportTitle>제보 날짜</S.ReportTitle>
                  <S.ReportContentText>{li.reportedDate}</S.ReportContentText>
                </S.Grid>
                <S.Grid>
                  <S.ReportTitle>팝업스토어 이름</S.ReportTitle>
                  <S.ReportContentText>{li.storeName}</S.ReportContentText>
                </S.Grid>
                <S.Grid>
                  <S.ReportTitle>정보 오류 내용</S.ReportTitle>
                  <S.ReportContentText>{li.infoErrContent}</S.ReportContentText>
                </S.Grid>
                <S.Grid>
                  <S.ReportTitle>정보 수정 내용</S.ReportTitle>
                  <S.ReportContentText>
                    {li.infoModifiContent}
                  </S.ReportContentText>
                </S.Grid>
                <S.Grid>
                  <S.ReportTitle>이미지</S.ReportTitle>
                  <S.ReportContentText>
                    <img src={li.errImg} />
                  </S.ReportContentText>
                </S.Grid>
                <S.ButtonBox>
                  <S.CheckBtn style={{ backgroundColor: 'white', color: '#9B9B9B' }} onClick={() => navigate('/master')}>
                    취소
                  </S.CheckBtn>
                  <S.CheckBtn onClick={checkHandler}>확인</S.CheckBtn>
                </S.ButtonBox>
              </S.GridBox>
            );
          })}
        </S.ReportContentListWrap>
      </S.ReportListContainer>
    </S.ReportListWrap>
  );
};

export default ErrReportDetail;
