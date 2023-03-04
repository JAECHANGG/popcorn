import styled from 'styled-components';
import COLORS from '../../../assets/CSS/colors';

export const MyBookmarkReportWrap = styled.div``;

export const MyBookmarkReportContainer = styled.div``;

export const MyBookmarkReportBox = styled.div`
  background: ${COLORS.gray8};
  border: 1px solid ${COLORS.gray7};
  border-radius: 0px 8px 8px 0px;
  padding: 0 15px;
`;

export const MyBookmarkReportTabMenu = styled.ul`
  padding: 0;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid ${COLORS.gray5};
`;

export const MyTitleTabTitleBox = styled.div``;
export const MyTitleTabBtn = styled.button`
  background-color: transparent;
  font-weight: bold;
  font-size: 20px;
  text-align: center;
  display: block;
  border: none;
  color: ${COLORS.black};
  padding-bottom: 10px;
  margin-top: 13px;
  text-decoration: none;
  cursor: pointer;
  width: 50%;
  &.active {
    padding-bottom: 12.5px;
    color: #00c113;
    border-bottom: 2px solid #00c113;
  }
`;

export const MyContentBox = styled.div`
  height: 800px;
  overflow: scroll;
`;
