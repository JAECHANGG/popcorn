import styled from 'styled-components';

export const ContentWrap = styled.div`
  height: 618px;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #ccc;
  }
`;

export const ListContainer = styled.div``;

export const ListBox = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);

  &:hover{
    cursor: pointer;
  }
`;
export const ListContent = styled.div`
  padding: 0 10px;
`;
export const TitleText = styled.p`
  font-size: 16px;
  font-weight: bold;
`;

export const DateText = styled.p`
  font-size: 12px;
  color: gray;
`;

export const NameText = styled.p`
  font-size: 12px;
  color: gray;
`;

export const StatusText = styled.p`
  font-size: 12px;
  float: right;
  color: green;
`;
